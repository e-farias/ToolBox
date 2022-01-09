# Python Environment
sudo git clone https://github.com/pyenv/pyenv.git ~/.pyenv
sudo echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
sudo echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
sudo echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n eval "$(pyenv init -)"\nfi' >> ~/.bashrc

sudo exec "$SHELL"

sudo pyenv install 2.7.16
sudo pyenv install 3.10.1
sudo pyenv global 3.10.1
