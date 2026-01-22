#!/bin/bash

# Deployment Script for Ubuntu Droplet with SSL
# Usage: ./deploy.sh
# NOTE: Ensure your domain's A Record points to this server before running.

set -e # Exit on error

# Load environment variables from .env
if [ -f ".env" ]; then
    set -a
    source .env
    set +a
    echo "✅ Loaded environment variables from .env"
else
    echo "❌ .env file not found. Please create one with MAIL_PASSWORD."
    exit 1
fi

DOMAIN="puspo.online"
EMAIL="puspopuspo520@gmail.com"

echo "🚀 Starting Deployment for $DOMAIN..."

# 1. Update System
echo "🔄 Updating system packages..."
sudo apt-get update -y

# 2. Install Docker & Docker Compose if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Docker not found. Installing..."

    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    fi
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

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

# # 4. SSL Certificate Setup (Certbot)
# echo "🔒 Checking SSL certificates..."

# if ! command -v certbot &> /dev/null; then
#     echo "Installing Certbot..."
#     sudo apt-get install -y certbot
# fi

# if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
#     echo "⚠️  SSL Certificates not found. Generating..."
#     sudo docker compose down --remove-orphans || true
#     sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN \
#         --non-interactive --agree-tos --expand -m $EMAIL
#     echo "✅ Certificates generated successfully."
# else
#     echo "✅ SSL Certificates found."
#     sudo certbot renew --quiet
# fi

# SSL step skipped because Cloudflare tunnel provides HTTPS
echo "🔒 Skipping SSL certificate generation (Cloudflare tunnel handles HTTPS)"

# 5. Build and Run Containers
echo "🏗️  Building and starting services..."
sudo docker compose down --remove-orphans
sudo docker compose build --no-cache
sudo docker compose up -d

echo "---------------------------------------------------"
echo "🎉 Deployment Complete!"
echo "🌍 App is live at: https://$DOMAIN"
echo "---------------------------------------------------"
