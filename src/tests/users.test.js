// making a test file for the users and it's functionalitiy

const request = require('supertest');
const json = require('json');
const User = require('../models/users');
const app = require('../apis/app');

describe('User API Testing', () => {
    let userId;
    let user;

    it('should return a list of users', async () => {
        const response = await request(app)
            .get('/api/users')
            .send();
        expect(response.status).toBe(200);
        const users = await User.findAll();
        const usersJSON = users.map(user => user.toJSON());
        expect(response.body.length).toBe(users.length);
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'johnwick@gmail.com',
                password: 'password12',
                role: 'teacher',
            });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    
        userId = response.body.id;
        user = await User.findByPk(userId);
        expect(user).not.toBeNull();
        expect(user.email).toBe('johnwick@gmail.com');
    });    

    it('should get the user using his id', async () => {
        const response = await request(app).get(`/api/users/${userId}`).send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBe(userId);
        expect(response.body.email).toBe('johnwick@gmail.com');
    })

    it('should update the user using the id', async () => {
        const response = await request(app).put(`/api/users/${userId}`).send({
            firstname: 'Abanoub',
            lastname: 'Tadros',
        })
        expect(response.status).toBe(200);
        const updatedUser = await User.findByPk(userId);
        expect(updatedUser.firstname).toBe('Abanoub');
        expect(updatedUser.lastname).toBe('Tadros');
    })

    it('should delete the user using the id', async () => {
        const response = await request(app).delete(`/api/users/${userId}`).send();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        const deletedUser = await User.findByPk(userId);
        expect(deletedUser).toBeNull();
    })
});

describe('User Authentication', () => {
    it('should return a 401 status code for invalid credentials', async () => {
        const response = await request(app).post('/signup').send({
            firstname: 'John',
            lastname: 'Doe',
            email: 'abanoubsamy2341@gmail.com',
            password: 'password12',
            role: 'teacher',
        });
        console.log(response.error)
        expect(response.status).toBe(201);
        const user = User.findOne({where: {email: 'abanoubsamy2341@gmail.com'}});
        expect(user).not.toBeNull();
    })});

