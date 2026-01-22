#!/bin/bash

echo "🛑 Stopping Portfolio Containers..."
docker compose -f docker-compose.yml -f docker-compose.local.yml down

echo "✅ Environment stopped."
