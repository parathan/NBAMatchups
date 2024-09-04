import os

def fix_imports(proto_dir):
    for filename in os.listdir(proto_dir):
        if filename.endswith('_grpc.py'):
            filepath = os.path.join(proto_dir, filename)
            with open(filepath, 'r') as file:
                content = file.read()
            content = content.replace('import teams_pb2 as teams__pb2', 'from . import teams_pb2 as teams__pb2')
            with open(filepath, 'w') as file:
                file.write(content)

if __name__ == "__main__":
    # Define the subdirectory
    script_dir = os.path.dirname(__file__)
    target_dir = os.path.join(script_dir, 'teams_python')
    fix_imports(target_dir)