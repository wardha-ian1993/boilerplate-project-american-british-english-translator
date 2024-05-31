const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  americanToBritish (string) {
    let translation = [];
    let text = string
      .slice(0, -1)
      .split(' ')
      .map(elem => {
        let translate = '';
        if (/:/.test(elem)) {
          translate = elem.replace(':', '.')
        }
        for (let word in americanToBritishSpelling) {
          const spelling = americanToBritishSpelling[word];
          if (elem.toLowerCase() === word) {
            translate = elem[0] === elem[0].toUpperCase()
              ? translate = spelling.slice(0, 1).toUpperCase() + spelling.slice(1)
              : translate = spelling;
          };
        }
        for (let word in americanToBritishTitles) {
          const title = americanToBritishTitles[word];
          if (elem.toLowerCase() === word) {
            translate = elem[0] === elem[0].toUpperCase()
              ? translate = title.slice(0, 1).toUpperCase() + title.slice(1)
              : translate = title;
          };
        }
        if (translate) {
          return `<span class='highlight'>${translate}</span>`;
        } else {
          return elem;
        }
      })
      .join(' ') + string.slice(-1);
      
    for (let word in americanOnly) {
      const wordRegex = new RegExp(word, 'ig');
      const murica = americanOnly[word];
      if (wordRegex.test(string)) {
        text = text.replace(wordRegex, `<span class='highlight'>${murica}</span>`);
      }
    }
    
    if (text === string) text = 'Everything looks good to me!';

    return { text: string, translation: text };
  };

  britishToAmerican (string) {
    let translation = [];
    let text = string
      .slice(0, -1)
      .split(' ')
      .map(elem => {
        let translate = '';
        if (/\d+\.\d+/.test(elem)) {
          translate = elem.replace('.', ':');
        }
        for (let word in americanToBritishSpelling) {
          const spelling = americanToBritishSpelling[word];
          if (elem.toLowerCase() === spelling) {
            translate = elem[0] === elem[0].toUpperCase()
              ? translate = word.slice(0, 1).toUpperCase() + word.slice(1)
              : translate = word;
          };
        }
        for (let word in americanToBritishTitles) {
          const title = americanToBritishTitles[word];
          if (elem.toLowerCase() === title) {
            translate = elem[0] === elem[0].toUpperCase()
              ? translate = word.slice(0, 1).toUpperCase() + word.slice(1)
              : translate = word;
          };
        }
        if (translate) {
          return `<span class='highlight'>${translate}</span>`;
        } else {
          return elem;
        }
      })
      .join(' ') + string.slice(-1);
      
    for (let word in britishOnly) {
      const wordRegex = new RegExp(word, 'ig');
      const british = britishOnly[word];
      if (wordRegex.test(string)) {
        text = text.replace(wordRegex, `<span class='highlight'>${british}</span>`);
      }
    }
    
    if (text === string) text = 'Everything looks good to me!';
    
    return { text: string, translation: text };
  };

}

module.exports = Translator;