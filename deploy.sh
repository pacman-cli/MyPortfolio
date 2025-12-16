#!/bin/bash

# Configuration
# Replace with your Droplet IP or set via argument
SERVER_IP="$1"
USER="root"
REMOTE_DIR="/root/portfolio"

if [ -z "$SERVER_IP" ]; then
  echo "Usage: ./deploy.sh <DROPLET_IP>"
  exit 1
fi

echo "🚀 Deploying to $SERVER_IP..."

# 1. Create remote directory
echo "📁 Creating remote directory..."
ssh $USER@$SERVER_IP "mkdir -p $REMOTE_DIR/nginx"

# 2. Upload Files
echo "content Uploading files..."
scp docker-compose.yml $USER@$SERVER_IP:$REMOTE_DIR/
scp nginx/default.conf $USER@$SERVER_IP:$REMOTE_DIR/nginx/
scp -r backend $USER@$SERVER_IP:$REMOTE_DIR/
scp -r frontend $USER@$SERVER_IP:$REMOTE_DIR/

# 3. Deploy
echo "🐳 Building and starting containers..."
ssh $USER@$SERVER_IP << EOF
  cd $REMOTE_DIR
  docker compose down --remove-orphans
  docker compose up --build -d
  docker system prune -f
EOF

echo "✅ Deployment complete! Check https://$SERVER_IP or your domain."
