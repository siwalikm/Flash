const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
var expect = chai.expect;
chai.use(chaiHttp);

describe('Unit tests | Flash', function () {
    before(function () {});
    after(function () {
        app.close();
    });
    describe('Check Delay mode', function () {
        it('should repond immediately', function testSlash(done) {
            let begin = Date.now();
            chai.request(app)
                .get('/delay/0')
                .then(() => {
                    let end = Date.now();
                    let responseDelay = Math.floor((end - begin) / 1000);
                    expect(responseDelay).equal(0);
                    done();
                });
        });

        it('should repond immediately using POST method', function testSlash(done) {
            let begin = Date.now();
            chai.request(app)
                .post('/delay/0')
                .then(() => {
                    let end = Date.now();
                    let responseDelay = Math.floor((end - begin) / 1000);
                    expect(responseDelay).equal(0);
                    done();
                });
        });

        it('should return 405 status if method is not GET or POST', function testSlash(done) {
            chai.request(app)
                .patch('/delay/0')
                .then((response) => {
                    expect(response.status).equal(405);
                    done();
                });
        });

        it('should repond after 3 sec delay', function testSlash(done) {
            let begin = Date.now();
            chai.request(app)
                .get('/delay/3000')
                .then(() => {
                    let end = Date.now();
                    let responseDelay = Math.floor((end - begin) / 1000);
                    expect(responseDelay).equal(3);
                    done();
                });
        });

        it('should repond after "random" delay', function testSlash(done) {
            let begin = Date.now();
            chai.request(app)
                .get('/delay/random')
                .then(response => {
                    let end = Date.now();
                    let responseDelay = Math.floor((end - begin) / 1000);
                    expect(responseDelay).to.be.at.most(10);
                    expect(response.body.status).equal(200);
                    done();
                });
        });

        it('should repond after "random" delay using POST method', function testSlash(done) {
            let begin = Date.now();
            chai.request(app)
                .post('/delay/random')
                .then(response => {
                    let end = Date.now();
                    let responseDelay = Math.floor((end - begin) / 1000);
                    expect(responseDelay).to.be.at.most(10);
                    expect(response.body.status).equal(200);
                    done();
                });
        });

        it('should return 500 error on wrong delay parameter', function testSlash(done) {
            chai.request(app)
                .get('/delay/helloThere')
                .then(response => {
                    expect(response.status).equal(500);
                    done();
                });
        });
    });

    describe('Check URL mode', function () {
        it('should redirect to valid domain without protocol', function testSlash(done) {
            chai.request(app)
                .get('/delay/0/url/api.github.com')
                .then((response) => {
                    expect(response.redirects.length).greaterThan(0);
                    expect(response.text).contain('github');
                    done();
                });
        });

        it('should redirect to valid domain with https protocol', function testSlash(done) {
            chai.request(app)
                .get('/delay/0/url/https://api.github.com')
                .then((response) => {
                    expect(response.redirects.length).greaterThan(0);
                    expect(response.text).contain('github');
                    done();
                });
        });
    });
});