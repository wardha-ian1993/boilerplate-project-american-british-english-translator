const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  americanToBritish (string) {
    let translate = string
      .split(' ')
      .map(elem => {
        if (/\:/.test(elem)) {
          elem = elem.replace(':', '.')
        }
        for (word in americanToBritishSpelling) {
          if (elem.toLowerCase() === word) {
            if (elem[0] === elem[0].toUpperCase()) {
              return americanToBritishSpelling[word].slice(0, 1).toUpperCase() 
                   + americanToBritishSpelling[word].slice(1);
            } else {
              return americanToBritishSpelling[word]
            }
          };
        }
        for (word in americanToBritishTitles) {
          if (elem.toLowerCase() === word) {
            if (elem[0] === elem[0].toUpperCase()) {
              return americanToBritishTitles[word].slice(0, 1).toUpperCase() 
                   + americanToBritishTitles[word].slice(1);
            } else {
              return americanToBritishTitles[word]
            }
          };
        }
        return elem;
      })
      .join(' ');

    for (word in americanOnly) {
      const wordRegex = new RegExp(word, 'ig');
      if (wordRegex.test(string)) {
        translate = translate.replace(wordRegex, match => americanOnly[match]);
      }
    }

    return translate;
  };

  britishToAmerican (string) {
    let translate = string
      .split(' ')
      .map(elem => {
        if (/\d\.\d/.test(elem)) {
          elem = elem.replace('.', ':')
        }
        for (word in americanToBritishSpelling) {
          if (elem.toLowerCase() === americanToBritishSpelling[word]) {
            if (elem[0] === elem[0].toUpperCase()) {
              return word.slice(0, 1).toUpperCase() + word.slice(1);
            } else {
              return word;
            }
          };
        }
        for (word in americanToBritishTitles) {
          if (elem.toLowerCase() === americanToBritishTitles[word]) {
            if (elem[0] === elem[0].toUpperCase()) {
              return word.slice(0, 1).toUpperCase() + word.slice(1);
            } else {
              return word;
            }
          };
        }
        return elem;
      })
      .join(' ');

    for (word in britishOnly) {
      const wordRegex = new RegExp(word, 'ig');
      if (wordRegex.test(string)) {
        translate = translate.replace(wordRegex, match => britishOnly[match]);
      }
    }

    return translate;
  };

}

module.exports = Translator;