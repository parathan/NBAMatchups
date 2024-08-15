import grpc
from concurrent import futures
import predict_pb2_grpc
import predict_pb2
from ML import lr_predict

class PredictionService(predict_pb2_grpc.PredictionServiceServicer):
    def Predict(self, request, context):
        # Extract features from the request
        features = request.features
        
        # Validate the features
        if not self.validate_features(features):
            context.set_details("Bad or Missing Request Parameter")
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            return predict_pb2.PredictionResponse()

        try:
            # Perform prediction
            print("Received features:", features)
            # Convert features to the format expected by your prediction function
            prediction = lr_predict.predict(features)
            
            # Return the response
            return predict_pb2.PredictionResponse(
                prob_loss=prediction[0],
                prob_win=prediction[1]
            )
        except Exception as e:
            context.set_details(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            return predict_pb2.PredictionResponse()

    def validate_features(self, features):
        # Ensure all features are of the expected type (int or float)
        return all(isinstance(item, (int, float)) for item in features)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    predict_pb2_grpc.add_PredictionServiceServicer_to_server(PredictionService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("gRPC server started on port 50052")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()