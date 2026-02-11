# NextMed Dicom Server

A DIMSE-C STORESCU service to receiver dicom via TCP/IP. Made with Node, TypeScript, dcmjs and & ☕.

## 📌 - Engines

Specific versions of engines, libraries, frameworks, plugins and other versioned tools.

- **Node**: 20.15.1
- **OS**: Debian 12 Bookworm

## ⚙️ - Install

- Create .env
- Create nextmed-dicom-server/src/services/gcp/service-account.json file

- Install repo dependencies:

 ```bash
  npm install
  ```

Install OS dependencies:

- dcmtk

  ```bash
  apt install -y dcmtk
  ```

- Puppeteer

  ```bash
  apt install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libxkbcommon-x11-0 \
    libxcomposite1 libxrandr2 libgbm1 libxdamage1 libasound2 \
    libxfixes3 libx11-xcb1 libxcursor1 libxrender1 libxi6 libxtst6 \
    libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 \
    libxss1
  ```

- Google Chrome

  ```bash
  apt install wget
  ```

  ```bash
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  ```

  ```bash
  apt install ./google-chrome-stable_current_amd64.deb
  ```

- Start

  ```bash
  npm dev
  ```
