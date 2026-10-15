
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer.trim()));
    });
}

async function apiRequest(url, token, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`${response.status}: ${error}`);
    }

    return response;
}

async function uploadFile(token) {
    const localPath = path.resolve(
        (await ask("Enter local file path: ")).replace(/^~(?=\/)/, require("os").homedir())
    );

    if (!fs.existsSync(localPath) || !fs.statSync(localPath).isFile()) {
        console.log("Error: File not found!");
        return;
    }

    const fileName = path.basename(localPath);
    const remoteName = (await ask(`Dropbox filename [${fileName}]: `)) || fileName;

    const response = await apiRequest(
        "https://content.dropboxapi.com/2/files/upload",
        token,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "Dropbox-API-Arg": JSON.stringify({
                    path: "/" + remoteName.replace(/^\/+/, ""),
                    mode: "overwrite",
                    autorename: false,
                    mute: false
                })
            },
            body: fs.readFileSync(localPath)
        }
    );

    const result = await response.json();
    console.log("File Uploaded Successfully!");
    console.log("Dropbox path:", result.path_display);
}

async function downloadFile(token) {
    let remotePath = await ask("Enter Dropbox file path (e.g. /sample.txt): ");

    if (!remotePath) {
        console.log("Please enter a file path.");
        return;
    }

    if (!remotePath.startsWith("/")) {
        remotePath = "/" + remotePath;
    }

    const defaultName = "downloaded_" + path.basename(remotePath);
    const localName = (await ask(`Save as [${defaultName}]: `)) || defaultName;

    const response = await apiRequest(
        "https://content.dropboxapi.com/2/files/download",
        token,
        {
            method: "POST",
            headers: {
                "Dropbox-API-Arg": JSON.stringify({ path: remotePath })
            }
        }
    );

    fs.writeFileSync(path.resolve(localName), Buffer.from(await response.arrayBuffer()));

    console.log("File Downloaded Successfully!");
    console.log("Saved at:", path.resolve(localName));
}

async function main() {
    console.log("\n==================================");
    console.log("  DROPBOX STORAGE AS A SERVICE");
    console.log("==================================");

    let token = process.env.DROPBOX_ACCESS_TOKEN;

    if (!token) {
        token = await ask("Enter your NEW Dropbox access token: ");
    }

    if (!token) {
        console.log("Access token is required.");
        return;
    }

    try {
        const accountResponse = await apiRequest(
            "https://api.dropboxapi.com/2/users/get_current_account",
            token,
            { method: "POST" }
        );

        const account = await accountResponse.json();
        console.log("Connected to Dropbox:", account.name.display_name);

        while (true) {
            console.log("\n1. Upload File");
            console.log("2. Download File");
            console.log("3. Exit");

            const choice = await ask("Enter choice: ");

            try {
                if (choice === "1") {
                    await uploadFile(token);
                } else if (choice === "2") {
                    await downloadFile(token);
                } else if (choice === "3") {
                    console.log("Program exited.");
                    break;
                } else {
                    console.log("Invalid choice. Enter 1, 2, or 3.");
                }
            } catch (error) {
                console.log("Operation failed:", error.message);
            }
        }
    } catch (error) {
        console.log("Dropbox connection failed:", error.message);
    } finally {
        rl.close();
    }
}

main();
