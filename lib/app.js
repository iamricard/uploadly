const CLIENT_ID = /* INSERT YOUR OWN! */;

const input = document.createElement('input');
document.body.appendChild(input);

function payload(srcURL) {
  const data = new FormData();
  data.append('image', srcURL);

  return data;
}

function handleClick({ srcUrl }, tab) {
  fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: { Authorization: CLIENT_ID },
    body: payload(srcUrl)
  })
    .then(response => response.json())
    .then(({ data }) => {
      input.value = data.link;
      input.focus();
      input.select();
      document.execCommand('copy');
      input.value = '';
    });
}

chrome.contextMenus.create({
  title: 'uploadly',
  contexts: ['image'],
  onclick: handleClick
});
