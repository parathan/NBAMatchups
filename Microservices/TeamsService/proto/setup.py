from setuptools import setup, find_packages

setup(
    name='teams_service',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'grpcio',
        'google.protobuf',
        'grpc',
        'warnings'
    ],
)