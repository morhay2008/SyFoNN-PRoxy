document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('proxy-form');
  const customSettings = document.getElementById('custom-settings');
  const proxyIpInput = document.getElementById('proxy-ip');
  const proxyPortInput = document.getElementById('proxy-port');
  const sameProxyCheckbox = document.getElementById('same-proxy');

  form.addEventListener('change', function () {
    if (form.proxy.value === 'custom_input') {
      customSettings.style.display = 'block';
    } else {
      customSettings.style.display = 'none';
    }
  });

  document.getElementById('save').addEventListener('click', function () {
    const proxyType = form.proxy.value;
    let proxyConfig = { proxyType };

    if (proxyType === 'custom_input') {
      proxyConfig.proxyIp = proxyIpInput.value;
      proxyConfig.proxyPort = parseInt(proxyPortInput.value, 10);
      proxyConfig.sameProxy = sameProxyCheckbox.checked;
    } else if (proxyType === 'local_proxy') {
      proxyConfig.proxyIp = "127.0.0.1";
      proxyConfig.proxyPort = 8080;
      proxyConfig.sameProxy = true;
    }

    console.log('Saving proxy configuration:', proxyConfig);

    browser.storage.local.set({ proxyConfig }).then(() => {
      console.log('Proxy configuration saved:', proxyConfig);
      browser.runtime.sendMessage({ action: 'updateProxy', proxyConfig });
    }).catch((error) => {
      console.error('Error saving proxy configuration:', error);
    });
  });

  browser.storage.local.get('proxyConfig', function (data) {
    if (data.proxyConfig) {
      document.querySelector(`input[name=proxy][value=${data.proxyConfig.proxyType}]`).checked = true;
      if (data.proxyConfig.proxyType === 'custom_input') {
        customSettings.style.display = 'block';
        proxyIpInput.value = data.proxyConfig.proxyIp;
        proxyPortInput.value = data.proxyConfig.proxyPort;
        sameProxyCheckbox.checked = data.proxyConfig.sameProxy;
      }
    }
  });
});
