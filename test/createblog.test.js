const supertest = require('supertest');
const app = require('../app');
const { connect } = require('./database');
const UserModel = require('../model/userModel');

const BlogModel = require('../model/blogModel');

// Test Suit
describe('Test for all published blog ', () => {
	let connection;
	let token;
	let id;
	beforeAll(async () => {
		connection = await connect();
	});
	beforeEach(async () => {
		await UserModel.create({
			first_name: 'Jeremiah',
			last_name: 'Fagbemi',
			email: 'dlhsfagbemi21@outlook.com',
			password: 'jerry',
		});
		const response = await supertest(app)
			.post('/v1/user/login')
			.set('content-type', 'application/json')
			.send({
				email: 'dlhsfagbemi21@outlook.com',
				password: 'jerry',
			});
		token = response.body.data.token;
	});
	afterEach(async () => {
		await connection.cleanup();
	});
	afterAll(async () => {
		await connection.disconnect();
	});
	it('It should create', async () => {
		const response = await supertest(app)
			.post('/v1/blog')
			.set('authorization', `Bearer ${token}`)
			.set('content-type', 'application/json')
			.send({
				title: ' Isreal vs Palestine',
				description: 'what is happening to isreal and palestine',
				author: 'jerry',
				body: 'They are at war',
				tags: 'drama',
			});

		expect(response.status).toEqual(200);
	});
});
