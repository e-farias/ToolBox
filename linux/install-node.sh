# Node.js & pnpm
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  echo "--- Installing nvm ---"
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi

if [ -s "$NVM_DIR/nvm.sh" ]; then
  \. "$NVM_DIR/nvm.sh"
else
  echo "Error: nvm.sh not found" >&2
  exit 1
fi

echo "--- Installing Node 24.12.0 & pnpm ---"
nvm install 24.12.0
nvm alias default 24.12.0
nvm use default
corepack enable
corepack prepare pnpm@latest --activate