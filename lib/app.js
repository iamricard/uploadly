const CLIENT_ID = 'CREATE ONE!';

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
  const message = 'Your image was uploaded succesfully, we copied the link to your clipboard.';

  const notification = chrome.notifications.create(id, {
    type: 'image',
    iconUrl: 'icons/128.png',
    imageUrl: `http://i.imgur.com/${id}m.jpg`,
    title: 'Image uploaded!',
    isClickable: true,
    message
  });

  chrome.notifications.onClicked.addListener(notificationId => {
    if (id !== notificationId) return;

    chrome.tabs.create({ url: link });
  });
}

function handleClick({ srcUrl }, tab) {
  fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: { Authorization: CLIENT_ID },
    body: payload(srcUrl)
  })
    .then(response => response.json())
    .then(({ data }) => {
      copyToClipboard(data.link);
      notify(data);
    });
}

chrome.contextMenus.create({
  title: 'uploadly',
  contexts: ['image'],
  onclick: handleClick
});
