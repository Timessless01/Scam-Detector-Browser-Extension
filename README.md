# Scam Detector Browser Extension
An AI-powered tool to detect phishing sites, scams, and fraud in real-time.

## Features
- Real-time URL scanning using Google Safe Browsing API
- AI model integration (TensorFlow.js)
- Custom warning UI
- Email Scam Detection: Scans email content for phishing keywords.
- Privacy-First: No data collection; all checks happen locally.

## Installation
1. Clone this repo: `git clone https://github.com/Timessless01/scam-detector-extension.git`
2. Load into Chrome: `chrome://extensions` > Enable "Developer mode" > "Load unpacked"
   
## Setup for Developers
1. Get a **Google Safe Browsing API key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
   - Create a project, enable the Safe Browsing API, and generate an API key.
2. Replace the placeholder in `src/background.js`:
   ```javascript
   const API_KEY = 'YOUR_API_KEY'; // Replace with your API key
   
## Contribute
- Report bugs via [Issues](https://github.com/Timessless01/scam-detector-extension/issues)
- Fork and submit PRs!
