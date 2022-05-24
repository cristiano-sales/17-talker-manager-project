// http://devfuria.com.br/javascript/numeros-aleatorios/
function getRandom() {
  return Math.floor(Math.random() * 16);
}

function token() {
  const characters = [
    '7', 'm', 'q', 'a', 'V', 'R', 'X', 'J', 'S', 'p', '8', '8', '6', 'C', 'G', 'r',
  ];
  let generatedToken = '';
  for (let i = 0; i < characters.length; i += 1) {
    generatedToken += characters[getRandom()];
  }
  return generatedToken;
}

module.exports = {
  token,
};
