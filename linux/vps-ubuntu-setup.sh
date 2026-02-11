#!/bin/bash
set -e

sudo apt update && sudo apt upgrade -y
sudo apt install -y git-all ca-certificates curl gnupg lsb-release ufw vim

# Docker
if ! command -v docker &> /dev/null; then
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt update
  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  sudo systemctl enable docker && sudo systemctl start docker
  sudo usermod -aG docker $USER
fi

# Swap
if [ ! -f /swapfile ]; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# Firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable

# Apache: remove if present (avoids conflict with Nginx on port 80)
if systemctl is-active --quiet apache2 2>/dev/null || dpkg -l apache2 &>/dev/null; then
  echo "--- Stopping and removing Apache ---"
  sudo systemctl stop apache2 2>/dev/null || true
  sudo systemctl disable apache2 2>/dev/null || true
  sudo apt remove -y apache2 apache2-bin apache2-utils apache2-data 2>/dev/null || true
  sudo apt purge -y apache2 apache2-bin apache2-utils apache2-data 2>/dev/null || true
  sudo apt autoremove -y
  echo "Apache removed."
fi

echo "--- Installing Nginx and Certbot ---"
sudo apt install -y nginx certbot python3-certbot-nginx

echo "--- Configuring Firewall ---"
sudo ufw allow 'Nginx Full'

# Verify Nginx is running
sudo systemctl enable nginx
sudo systemctl start nginx

echo "All Done!"
