# teamsservice/Dockerfile
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

COPY .env ./

# Copy the source code
COPY . .

# Build the Go binary
RUN go build -o /teamsservice

# Final stage: minimal image to run the binary
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /teamsservice .
EXPOSE 50051
CMD ["./teamsservice"]