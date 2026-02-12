## Generate a new SSH key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
## Start the SSH agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## Copy your public key
```bash
cat ~/.ssh/id_ed25519.pub
```

## Add the SSH key to your GitHub account
- Go to GitHub → Settings
- Click SSH and GPG keys
- Click New SSH key
- Paste the key
- Save

## Test the connection
```bash
ssh -T git@github.com
```
