const write = value => {
  const input = document.createElement('input');
  document.body.appendChild(input);

  input.value = value;
  input.focus();
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
};

module.exports = { write };
