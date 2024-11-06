# Use a lightweight Python 3.12 image as the base.
FROM python:3.12-slim

# Set the working directory inside the container.
WORKDIR /app

# Install Git and any other necessary dependencies.
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install dependencies.
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the source code to the container.
COPY . .

# Expose port 50051 for external access.
EXPOSE 50051

# Set the default command to run the service.
CMD ["python", "app.py"]