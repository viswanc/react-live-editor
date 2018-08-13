const chars = "abcdefghijklmnopqrstuvwxyz0123456789    ";

const getRandomInt = (min=0, max=1) => {
  
  return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}

const getRandomText = (length=10) => {
  
  let ret = '';

  for(let i=0; i < length; ++i) {

    ret += chars.substr(getRandomInt(1, chars.length), 1);
  }

  return ret;
}

export {
  getRandomInt,
  getRandomText,
}