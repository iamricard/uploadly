const bel = require('bel');
const storage = require('./storage');
const clipboard = require('./clipboard');
const app = document.getElementById('app');

const handleClipboardClick = (srcURL, thumbnail) => () => {
  clipboard.write(srcURL);
  chrome.notifications.create(srcURL, {
    type: 'basic',
    iconUrl: thumbnail,
    title: 'Copied to clipboard :)',
    message: ''
  });
};

const viewClipboard = (srcURL, thumbnail) => bel`
  <div onclick=${handleClipboardClick(srcURL, thumbnail)} class='action'>
    <i class='material-icons'>content_copy</i>
    Copy to Clipboard
  </div>
`;

const viewOpen = () => bel`
  <div class='action'>
    <i class="material-icons">open_in_new</i>
    Open
  </div>
`;

const viewThumbnail = src => bel`
  <img class='media-figure' src=${src} alt='thumbnail for imgur upload' />
`;

const viewBody = (src, thumbnail) => bel`
  <div class='media-body'>
    ${viewOpen()}
    ${viewClipboard(src, thumbnail)}
  </div>
`;

const viewUpload = u => bel`
  <div class='media upload'>
    ${viewThumbnail(u.thumbnail)}
    ${viewBody(u.link, u.thumbnail)}
  </div>
`;

const render = uv => app.appendChild(uv);

storage.get().then(uploads => {
  app.innerHTML = '';
  uploads.map(viewUpload).forEach(render);
});
