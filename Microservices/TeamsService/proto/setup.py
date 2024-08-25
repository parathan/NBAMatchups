from setuptools import setup, find_packages

setup(
    name='teams_python',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'grpcio',
        'protobuf',
        'grpc',
        'warnings'
    ],
)