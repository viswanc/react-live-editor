/* Utils */

/* Data */
const defaultChars = 'abcdefghijklmnopqrstuvwxyz0123456789    ';

/* Methods */
const getRandomInt = (min=0, max=1) => {
  
  return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}

const getRandomText = (length=10, chars=defaultChars) => {

  let ret = '';

  for(let i=0; i < length; ++i) {

    ret += chars.substr(getRandomInt(0, chars.length - 1), 1);
  }

  return ret;
}

module.exports =  {
  getRandomInt,
  getRandomText,
}