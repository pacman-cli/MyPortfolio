#!/bin/bash

# Deployment Script for Ubuntu Droplet with SSL
# Usage: ./deploy.sh
# NOTE: Ensure you have pointed your domain (A Record) to this server's IP before running.

set -e # Exit on error

DOMAIN="puspo.online"
EMAIL="puspopuspo520@gmail.com" # Change this or use --register-unsafely-without-email

echo "🚀 Starting Deployment for $DOMAIN..."

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

# 4. SSL Certificate Setup (Certbot)
echo "🔒 Checking SSL certificates..."

# Install certbot if missing
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt-get install -y certbot
fi

# Check if certificates exist, if not, generate them
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
    echo "⚠️  SSL Certificates not found. Generating them now..."
    
    # Stop any conflicting services on port 80
    sudo docker compose down --remove-orphans || true
    
    # Run Certbot in standalone mode (requires port 80 to be free)
    sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN \
        --non-interactive --agree-tos -m $EMAIL
        
    echo "✅ Certificates generated successfully."
else
    echo "✅ SSL Certificates found."
    # Attempt renewal just in case
    sudo certbot renew --quiet
fi

# 5. Build and Run Containers
echo "🏗️  Building and starting services..."
sudo docker compose down --remove-orphans
sudo docker compose build --no-cache
sudo docker compose up -d

echo "---------------------------------------------------"
echo "🎉 Deployment Complete!"
echo "🌍 App is live at: https://$DOMAIN"
echo "---------------------------------------------------"
