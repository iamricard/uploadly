const api = require('./api');
const clipboard = require('./clipboard');
const storage = require('./storage');

function handleAnonClick({ srcUrl }, tab) {
  chrome.notifications.create(srcUrl, {
    type: 'basic',
    iconUrl: 'icons/128.png',
    title: 'Uploading image!',
    message: 'Please wait <3'
  });

  api.upload(srcUrl).then(({ data }) => {
    chrome.notifications.clear(srcUrl);
    clipboard.write(data.link);
    storage.add({
      id: data.id,
      link: data.link,
      thumbnail: `http://i.imgur.com/${data.id}s.jpg`
    });
    chrome.notifications.create(data.id, {
      type: 'basic',
      iconUrl: `http://i.imgur.com/${data.id}m.jpg`,
      title: 'Image uploaded!',
      isClickable: true,
      message: 'Your images was uploaded succesfully!'
    });
    chrome.notifications.onClicked.addListener(notificationId => {
      if (data.id !== notificationId) return;

      chrome.tabs.create({ url: data.link });
    });
  });
}

chrome.contextMenus.create(
  {
    title: 'Imgur upload',
    contexts: ['image'],
    id: 'main'
  },
  function createActions() {
    chrome.contextMenus.create({
      title: 'upload anonymously',
      contexts: ['image'],
      parentId: 'main',
      onclick: handleAnonClick
    });

    chrome.contextMenus.create({
      title: 'upload to your account (coming soon!)',
      contexts: ['image'],
      parentId: 'main',
      enabled: false
    });
  }
);
