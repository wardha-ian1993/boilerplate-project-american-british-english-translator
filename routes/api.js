'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      const isLocaleValid = [
        'american-to-british', 
        'british-to-american'
      ].includes(locale);

      if (text === '') return res.json({ error: 'No text to translate' });
      if (!text || !locale) return res.json({ error: 'Required field(s) missing' });
      if (!isLocaleValid) return res.json({ error: 'Invalid value for locale field' });
      
      let result;
      switch (true) {
        case (locale === 'american-to-british'):
          result = translator.americanToBritish(text);
          break;
        case (locale === 'british-to-american'):
          result = translator.britishToAmerican(text);
          break;
        default:
          break;
      }
      
      return res.json({ text: result.text, translation: result.translation });
    });
};
