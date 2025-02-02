const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const baseUrl = 'http://ec2-15-207-98-255.ap-south-1.compute.amazonaws.com:8000/api';

describe('FAQ API Tests', () => {

  // Test for GET /api/listFaq
  it('should list all FAQs', (done) => {
    request(baseUrl)
      .get('/listFaq')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for POST /api/postFaq
  it('should create a new FAQ', (done) => {
    const newFaq = {
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
      translations: {
        es: {
          question: '¿Qué es Node.js?',
          answer: 'Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Chrome.'
        }
      }
    };

    request(baseUrl)
      .post('/postFaq')
      .send(newFaq)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.question).to.equal(newFaq.question);
        expect(res.body.answer).to.equal(newFaq.answer);
        done();
      });
  });

});

