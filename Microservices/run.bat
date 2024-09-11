@echo off

start cmd /c "cd TeamsService && go run main.go"

start cmd /c "cd predictions && python grpc_server.py"

start cmd /c "cd api-gateway && go run main.go"

pause