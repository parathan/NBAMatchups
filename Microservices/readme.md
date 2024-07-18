## Requirements  

Need to install protobuf:  

https://github.com/protocolbuffers/protobuf/releases

add to environment path

download needed go-protoc modules:  
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Run proto files using this command:  
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative teams.proto  

# Testing  
Currently using Kreya to test the grpc calls.  
