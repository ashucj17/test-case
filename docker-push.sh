#!/bin/bash

# This script builds and pushes the Docker image to Docker Hub

# Variables (change these)
DOCKER_USERNAME="your-username"
IMAGE_NAME="course-list-app"
TAG="latest"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Tag the image
echo "Tagging image as $DOCKER_USERNAME/$IMAGE_NAME:$TAG"
docker tag $IMAGE_NAME $DOCKER_USERNAME/$IMAGE_NAME:$TAG

# Log in to Docker Hub
echo "Logging in to Docker Hub..."
docker login

# Push the image to Docker Hub
echo "Pushing image to Docker Hub..."
docker push $DOCKER_USERNAME/$IMAGE_NAME:$TAG

echo "Done! Image pushed to $DOCKER_USERNAME/$IMAGE_NAME:$TAG"