const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('Translation with text and locale fields', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ 
        text: 'eon, mr., rif.', 
        locale: 'american-to-british' 
      })
      .end((err, res) => {
        const { text, translation } = res.body;
        assert.equal(res.status, 200);
        assert.equal(text, 'eon, mr., rif.');
        assert.equal(
          translation, 
          `<span class="highlight">aeon</span>, <span class="highlight">mr</span>, <span class="highlight">redundancy</span>.`
        );
        done();
      });
  });

  test('Translation with text and invalid locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ 
        text: 'eon, mr., rif.', 
        locale: 'american-to-spanish' })
      .end((err, res) => {
        const { error } = res.body;
        assert.equal(res.status, 200);
        assert.equal(error, 'Invalid value for locale field');
        done();
      });
  });

  test('Translation with missing text field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ 
        locale: 'american-to-british' 
      })
      .end((err, res) => {
        const { error } = res.body;
        assert.equal(res.status, 200);
        assert.equal(error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with missing locale field', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ 
        text: 'eon, mr., rif.' 
      })
      .end((err, res) => {
        const { error } = res.body;
        assert.equal(res.status, 200);
        assert.equal(error, 'Required field(s) missing');
        done();
      });
  });

  test('Translation with empty text', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ 
        text: '', 
        locale: 'american-to-british' 
      })
      .end((err, res) => {
        const { error } = res.body;
        assert.equal(res.status, 200);
        assert.equal(error, 'No text to translate');
        done();
      });
  });

  test('Translation with text that needs no translation', function(done) {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'aeon, mr, redudancy.', locale: 'american-to-british' })
      .end((err, res) => {
        const { text, translation } = res.body;
        assert.equal(res.status, 200);
        assert.equal(text, 'aeon, mr, redudancy.');
        assert.equal(
          translation, 
          'Everything looks good to me!'
        );
        done();
      });
  });

});
