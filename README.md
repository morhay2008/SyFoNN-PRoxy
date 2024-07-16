# SyFoNN-PRoxy Read.me

## Description
Firefox extension that allows users to easily switch between different proxy settings directly from the browser action popup. Designed with a hacker theme, it provides a streamlined interface for managing proxy configurations.

## Features
- **Turn On Proxy**: Enable the proxy with predefined settings.
- **Turn Off Proxy**: Disable the proxy settings.
- **Custom Proxy Input**: Enter custom proxy details (IP and port) for manual configuration.
- **My Local Proxy**: Use a local proxy setup (127.0.0.1:8080).

## Permissions
This extension requires the following permissions:
- `storage`: To store user preferences.
- `proxy`: To update proxy settings.
- `notifications`: To show notifications for proxy status updates.

## Installation
1. Download the `.xpi` file from the provided link after signing.
2. Open Firefox.
3. Go to `about:addons`.
4. Click the gear icon and select "Install Add-on From File...".
5. Select the signed `.xpi` file.

## Building and Signing
To build and sign the extension, follow these steps:

1. Navigate to your extension directory:
   ```sh
   cd /path/to/my-extension
   ```

2. Build the extension:
   ```sh
   web-ext build
   ```

3. Sign the extension:
   ```sh
   web-ext sign --api-key=<your-api-key> --api-secret=<your-api-secret> --channel=unlisted
   ```

Replace `<your-api-key>` and `<your-api-secret>` with the values obtained from the Mozilla Developer Hub.

## Manifest
Here is the `manifest.json` used in this extension:

```json
{
  "manifest_version": 2,
  "name": "Hacker Proxy Settings",
  "version": "1.4",
  "description": "Change Firefox proxy settings with a hacker theme",
  "icons": {
    "48": "icons/icon.png"
  },
  "permissions": [
    "storage",
    "proxy",
    "notifications"
  ],
  "background": {
    "scripts": ["background.js"]
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "48": "icons/icon.png"
    }
  },
  "incognito": "spanning",
  "browser_specific_settings": {
    "gecko": {
      "id": "{e1e549f3-7050-46aa-bad8-f18b6b70925f}",
      "strict_min_version": "91.1.0"
    }
  }
}
```

## Development
- **Source Code**: The source code for the extension can be found in the `/path/to/my-extension` directory.
- **Directory Structure**:
  ```
  my-extension/
  ├── manifest.json
  ├── popup.html
  ├── popup.js
  ├── background.js
  └── icons/
      └── icon.png
  ```

## Usage
1. Click the extension icon in the Firefox toolbar.
2. Choose the desired proxy configuration option from the popup.
3. Enter custom proxy details if the "Custom Proxy Input" option is selected.
4. The extension will update the proxy settings and notify you of the change.

## Troubleshooting
- Ensure the `manifest.json` file is correctly configured with the necessary permissions and settings.
- Verify that all files are UTF-8 encoded without BOM.
- Ensure no hidden or unnecessary files are included in the `.zip` before renaming it to `.xpi`.

Enjoy!
