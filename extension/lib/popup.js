const storage = require('./storage');
const app = document.getElementById('app');

const viewUpload = u => {
  const el = document.createElement('a');
  const thumbnail = document.createElement('img');
  const title = document.createElement('div');

  el.classList.add('media');
  el.classList.add('upload');
  el.classList.add('px2');
  thumbnail.classList.add('media-figure');
  title.classList.add('media-body');
  title.classList.add('truncate');

  el.href = u.link;
  el.alt = `Open image ${u.id} on imgur`;
  thumbnail.src = u.thumbnail;
  title.innerHTML = u.id;

  el.appendChild(thumbnail);
  el.appendChild(title);

  return el;
};

const render = uv => app.appendChild(uv);

storage.get().then(uploads => {
  app.innerHTML = '';
  uploads.map(viewUpload).forEach(render);
});
