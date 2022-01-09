# JavaScript Environment
sudo curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh -o nvm_install.sh

sudo sh nvm_install.sh

sudo export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

sudo exec "$SHELL"

sudo nvm install --lts
sudo npm install --global yarn
sudo nvm install 13.13.0
