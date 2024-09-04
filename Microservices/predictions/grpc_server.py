import grpc
from concurrent import futures
import predict_pb2_grpc
import predict_pb2
import teams_python as teams

from ML import lr_predict
from ML import constants

class PredictionService(predict_pb2_grpc.PredictionServiceServicer):
    def Predict(self, request, context):
        try:
            channel = grpc.insecure_channel('localhost:50051')
            stub = teams.teams_pb2_grpc.TeamsServiceStub(channel)

            twoTeamRequest = teams.teams_pb2.TwoTeamsRequest(
                team1=request.team1,
                team2=request.team2,
                year=request.year
            )

            response = stub.GetTwoTeams(twoTeamRequest)
            params = []
            team_list = constants.TEAM_LIST
            features = constants.FEATURE_LIST

            # Extract features from the request in team1 first
            for team in team_list:
                team = getattr(response, team, None)  # Safely access attribute teams
                for feature in features:
                    feature_value = getattr(team, feature, None)  # Safely access attribute features for team
                    if isinstance(feature_value, (int, float)):
                        params.append(feature_value)
                    else:
                        context.set_details("Bad or Missing Request Parameter: From " team + " " + feature)
                        context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                        return predict_pb2.PredictionResponse()

            # Convert features to the format expected by your prediction function
            prediction = lr_predict.predict(params)
            
            # Return the response
            return predict_pb2.PredictionResponse(
                prediction=prediction[1]
            )
        except Exception as e:
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return predict_pb2.PredictionResponse()
    
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    predict_pb2_grpc.add_PredictionServiceServicer_to_server(PredictionService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("gRPC server started on port 50052")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()