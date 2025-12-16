#!/bin/bash

# Deployment Script for Ubuntu Droplet
# Usage: ./deploy.sh

set -e # Exit on error

echo "🚀 Starting Deployment for puspo.online..."

# 1. Update System
echo "🔄 Updating system packages..."
sudo apt-get update -y

# 2. Install Docker & Docker Compose if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Docker not found. Installing..."
    
    # Add Docker's official GPG key:
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    fi
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    echo "✅ Docker installed successfully."
else
    echo "✅ Docker is already installed."
fi

# 3. Pull Latest Changes (if this is a git repo)
if [ -d ".git" ]; then
    echo "⬇️  Pulling latest changes from git..."
    git pull || echo "⚠️  Git pull failed (local changes?), continuing..."
fi

# 4. Build and Run Containers
echo "🏗️  Building and starting services..."
sudo docker compose down --remove-orphans
sudo docker compose build --no-cache
sudo docker compose up -d

echo "---------------------------------------------------"
echo "🎉 Deployment Complete!"
echo "🌍 App should be live at: http://puspo.online"
echo "---------------------------------------------------"
