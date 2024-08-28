@echo off
echo Generating Code...

echo Generating Go Code:
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative teams.proto

echo Generating Python Code:
python -m grpc_tools.protoc -I. --python_out=./teams_python/teams_python --grpc_python_out=./teams_python/teams_python teams.proto

echo Fix Python Imports
cd teams_python
py fix_imports.py