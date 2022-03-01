# JavaScript Environment
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh -o nvm_install.sh

sh nvm_install.sh

# sudo export NVM_DIR="$HOME/.nvm"
#   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
#   [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

\. "$NVM_DIR/nvm.sh" [ -s "$NVM_DIR/bash_completion" ]
\. "$NVM_DIR/bash_completion"

exec "$SHELL"

nvm install --lts
npm install --global yarn
nvm install 13.13.0
