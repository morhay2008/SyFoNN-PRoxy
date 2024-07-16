function log(message) {
  console.log(`[Proxy Extension] ${message}`);
}

function showNotification(message) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.runtime.getURL("icons/icon.png"),
    "title": "Proxy Settings",
    "message": message
  });
  log(message);
}

async function updateProxyConfig(proxyConfig) {
  try {
    const { proxyType, proxyIp, proxyPort, sameProxy } = proxyConfig;
    log(`Updating proxy settings with proxyType: ${proxyType}, proxyIp: ${proxyIp}, proxyPort: ${proxyPort}, sameProxy: ${sameProxy}`);

    let proxySettings;

    if (proxyType === 'turn_on') {
      proxySettings = { 
        proxyType: 'manual',
        socksVersion: 5,
        httpProxyAll: true
      };
    } else if (proxyType === 'turn_off') {
      proxySettings = { proxyType: 'none' };
    } else if (proxyType === 'custom_input' && proxyIp && proxyPort) {
      if (sameProxy) {
        proxySettings = {
          proxyType: 'manual',
          http: `http://${proxyIp}:${proxyPort}`,
          https: `http://${proxyIp}:${proxyPort}`,
          httpProxyAll: true,
          socksVersion: 5
        };
      } else {
        proxySettings = {
          proxyType: 'manual',
          http: `http://${proxyIp}:${proxyPort}`,
          https: `http://${proxyIp}:${proxyPort}`,
          socksVersion: 5
        };
      }
    } else if (proxyType === 'local_proxy') {
      proxySettings = {
        proxyType: 'manual',
        http: 'http://127.0.0.1:8080',
        https: 'http://127.0.0.1:8080',
        httpProxyAll: true,
        socksVersion: 5
      };
    }

    log(`Applying proxy configuration: ${JSON.stringify(proxySettings)}`);
    await browser.proxy.settings.set({ value: proxySettings });

    // Verify the settings have been applied
    const currentSettings = await browser.proxy.settings.get({});
    log(`Current proxy settings: ${JSON.stringify(currentSettings.value)}`);

    showNotification("Proxy settings updated successfully.");
  } catch (error) {
    showNotification(`Error updating proxy settings: ${error}`);
    log(`Error: ${error}`);
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'updateProxy') {
    updateProxyConfig(message.proxyConfig);
  }
});

