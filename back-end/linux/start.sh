# Check for updates
apt update && apt upgrade

# Linux Utils and Development Environment
apt-get install -y zip unzip make build-essential libssl-dev zlib1g-dev curl wget systemd vim git-all

sh node.sh
sh python.sh
