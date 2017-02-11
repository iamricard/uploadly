const createFormData = srcURL => {
  const data = new FormData();
  data.append('image', srcURL);

  return data;
};

const upload = srcURL => fetch('https://api.imgur.com/3/image', {
  method: 'POST',
  headers: { Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_ID },
  body: createFormData(srcURL)
}).then(response => response.json());

module.exports = { upload };
