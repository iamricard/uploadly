const bel = require('bel');
const storage = require('./storage');
const app = document.getElementById('app');

const viewClipboard = () => bel`
  <div class='action'>
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

const viewThumbnail = (title, src) => bel`
  <img class='media-figure' src=${src} alt='Thumbnail for ${title}' />
`;

const viewBody = (text, src) => bel`
  <div class='media-body'>
    ${viewOpen()}
    ${viewClipboard()}
  </div>
`;

const viewUpload = u => bel`
  <div class='media upload'>
    ${viewThumbnail(u.id, u.thumbnail)}
    ${viewBody(u.id, u.link)}
  </div>
`;

const render = uv => app.appendChild(uv);

storage.get().then(uploads => {
  app.innerHTML = '';
  uploads.map(viewUpload).forEach(render);
});
