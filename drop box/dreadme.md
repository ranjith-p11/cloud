
# Dropbox Storage as a Service

## Aim
To integrate the Dropbox API into a JavaScript application to upload and download files using cloud storage.

## Description
This project demonstrates Storage as a Service (STaaS) using Dropbox. It allows users to upload local files to Dropbox and download files from Dropbox to their computer through a simple command-line menu.

## Technologies Used
- JavaScript
- Node.js
- Dropbox API
- Dropbox Cloud Storage

## Requirements
- Node.js version 18 or newer
- A Dropbox account
- A Dropbox developer app
- A valid Dropbox access token with the required permissions
- Internet connection

## Project Structure

```text
dropbox-experiment/
├── dropbox_experiment.js
└── README.md
```

## Setup Instructions

### 1. Install Node.js
Install Node.js 18 or newer from:
https://nodejs.org/

Verify the installation:

```bash
node --version
```

### 2. Create a Dropbox App
1. Visit https://www.dropbox.com/developers/apps
2. Create a new app.
3. Choose Scoped Access.
4. Select Full Dropbox or App Folder.
5. Enable the required file permissions.
6. Generate a new access token for testing.

### 3. Run the Application
Open the project folder in VS Code.

Run:

```bash
node dropbox.js
```

No additional npm packages are required for this version.

## Application Menu

```text
==================================
  DROPBOX STORAGE AS A SERVICE
==================================

1. Upload File
2. Download File
3. Exit
Enter choice:
```

### Option 1: Upload File
- Enter `1`.
- Provide the local file path.
- Enter a Dropbox filename or press Enter to use the original filename.
- The file is uploaded to Dropbox.

Example local path on macOS:

```text
/Users/your-username/Downloads/sample.txt
```

### Option 2: Download File
- Enter `2`.
- Enter the Dropbox file path, such as `/sample.txt`.
- Enter a local filename or press Enter to use the default.
- The file is saved to your computer.

### Option 3: Exit
Enter `3` to close the application.

## Security
- Never publish your Dropbox access token.
- Revoke any token accidentally exposed in screenshots or public repositories.
- Generate a replacement token and grant only the required permissions.
- Avoid committing credentials to GitHub.

## Expected Result
The application connects to Dropbox, uploads local files, and downloads files stored in Dropbox. It demonstrates how cloud storage can be integrated into a JavaScript application.

## Conclusion
Thus, the Dropbox API was integrated into a Node.js application to demonstrate Storage as a Service through file upload and download operations.
