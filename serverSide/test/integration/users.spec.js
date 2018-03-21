// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const { port } = require('../../index');
const { assert } = chai;

chai.use(chaiHttp);

let existingUser;
let newUser = '111222';

describe('Users', () => {

    describe('/GET users', () => {
        it('should get users and response should have all necessary keys for each user', (done) => {
            chai.request(`http://localhost:${port}`)
                .get('/user')
                .end((err, res) => {
                    const { body } = res;

                    assert.isObject(res, 'Response is not an object');
                    assert.equal(res.status, 200, 'Incorrect status');
                    assert.isTrue(body.success, 'Response was not success');
                    for (const user of body.users) {
                        assert.isObject(user);
                        assert.containsAllKeys(user, ['id', 'login', 'email']);
                    }

                    existingUser = body.users[0].id;

                    done();
                });
        });
    });

    describe('/GET user/:id', () => {
        it('should get one user by id and it should have all necessary keys', (done) => {
            chai.request(`http://localhost:${port}`)
                .get(`/user/${existingUser}`)
                .end((err, res) => {
                    const { body } = res;

                    assert.isObject(res, 'Response is not an object');
                    assert.equal(res.status, 200, 'Incorrect status');
                    assert.isTrue(body.success, 'Response was not success');                    
                    assert.isObject(body.user);
                    assert.containsAllKeys(body.user, ['id', 'login', 'email']);

                    done();
                });
        });
    });

    describe('/GET user/:id', () => {
        it('should create one user by id and it should have success status', (done) => {
            chai.request(`http://localhost:${port}`)
                .post(`/user/${newUser}`)
                .send({ login: 'johnnydepp', email: 'johny@de.pp' })
                .end((err, res) => {
                    const { body } = res;

                    assert.isObject(res, 'Response is not an object');
                    assert.equal(res.status, 200, 'Incorrect status');
                    assert.isTrue(body.success, 'Response was not success');

                    done();
                });
        });
    });
});
