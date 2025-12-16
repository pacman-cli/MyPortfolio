#!/bin/bash

# Start Local Development Environment
echo "🚀 Starting Portfolio Locally (HTTP only)..."
echo "👉 App will be available at: http://localhost"

docker compose -f docker-compose.yml -f docker-compose.local.yml up --build
