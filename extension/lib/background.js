const storage = require('./storage');

const input = document.createElement('input');
document.body.appendChild(input);

function payload(srcURL) {
  const data = new FormData();
  data.append('image', srcURL);

  return data;
}

function copyToClipboard(link) {
  input.value = link;
  input.focus();
  input.select();
  document.execCommand('copy');
  input.value = '';
}

function notify({ id, link }) {
  const message = `Your image was uploaded succesfully, we copied the link to your clipboard.
You may click on this notification to open the image in a new tab <3
`;

  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: `http://i.imgur.com/${id}m.jpg`,
    title: 'Image uploaded!',
    isClickable: true,
    message
  });

  storage.add({
    id,
    link,
    thumbnail: `http://i.imgur.com/${id}s.jpg`
  });

  chrome.notifications.onClicked.addListener(notificationId => {
    if (id !== notificationId) return;

    chrome.tabs.create({ url: link });
  });
}

function handleAnonClick({ srcUrl }, tab) {
  chrome.notifications.create(srcUrl, {
    type: 'basic',
    iconUrl: 'icons/128.png',
    title: 'Uploading image!',
    message: 'Please wait <3'
  });

  fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: { Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID },
    body: payload(srcUrl)
  })
    .then(response => response.json())
    .then(({ data }) => {
      chrome.notifications.clear(srcUrl);
      copyToClipboard(data.link);
      notify(data);
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
