chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "cropImage",
      title: "Crop Image",
      contexts: ["image"]
    });
     // 创建第二个右键菜单项，用于下载裁剪后的图片
     chrome.contextMenus.create({
        id: "cropAndDownloadImage",
        title: "Crop And Download",
        contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "cropImage") {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
      }).then(() => {
        chrome.tabs.sendMessage(tab.id, {type: 'cropImage', url: info.srcUrl});
      }).catch(err => console.error('Script injection failed:', err));
    } else if (info.menuItemId === "cropAndDownloadImage") {
        // 发送消息到content.js以下载裁剪后的图像
        chrome.tabs.sendMessage(tab.id, {type: 'downloadCropped', url: info.srcUrl}).catch(err => console.error('Script injection failed:', err));
    }
  });
  
  