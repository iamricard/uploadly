const APP_KEY = 'imgur-uploads';

const parseStored = str => new Promise((resolve, reject) => {
  let parsed;

  try {
    parsed = JSON.parse(str);
  } catch (e) {
    parsed = [];
  }

  resolve(Array.isArray(parsed) ? parsed : []);
});

const get = () => new Promise((resolve, reject) => {
  chrome.storage.sync.get(APP_KEY, stored => {
    parseStored(stored[APP_KEY]).then(resolve);
  });
});

const add = val => {
  get().then(uploads => {
    chrome.storage.sync.set({
      [APP_KEY]: JSON.stringify([val, ...uploads])
    });
  });
};

module.exports = { get, add };
