# teamsservice/Dockerfile
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the Go binary
RUN go build -o /teamsservice

# Final stage: minimal image to run the binary
FROM gcr.io/distroless/base-debian12
WORKDIR /root/
COPY --from=builder /teamsservice .
COPY .env .
EXPOSE 50051
CMD ["./teamsservice"]