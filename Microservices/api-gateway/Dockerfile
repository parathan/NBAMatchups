# Use Go base image for building the service.
FROM golang:1.22-alpine AS builder

# Set working directory in container
WORKDIR /app

# Copy Go module files first, download dependencies, and cache them.
COPY go.mod go.sum ./
RUN go mod tidy && go mod download

# Copy the remaining source code
COPY . .

# Build the Go binary
RUN go build -o /api-gateway

# Final stage: create a minimal image to run the service.
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /api-gateway .
EXPOSE 8080
CMD ["./api-gateway"]