FROM docker:latest

WORKDIR /app

# Install docker-compose inside the container
RUN apk add --no-cache docker-compose

# Accept Docker Hub credentials as arguments
ARG DOCKER_USERNAME
ARG DOCKER_PASSWORD

# Automate Docker login
RUN echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Copy necessary files
COPY compose.yml .
COPY .env .

CMD ["docker-compose", "up", "-d"]
