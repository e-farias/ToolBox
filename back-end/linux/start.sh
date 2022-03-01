# Config WSL2 default login with root
# Check for updates
apt update && apt upgrade

# Linux Utils and Development Environment
apt-get install -y zip unzip make build-essential libssl-dev zlib1g-dev curl wget systemd vim git-all tree

sh node.sh -y
sh python.sh -y
