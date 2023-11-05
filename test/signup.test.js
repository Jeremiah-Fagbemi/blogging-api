const supertest = require('supertest');
const app = require('../app');
const { connect } = require('./database');
const UserModel = require('../model/userModel');

describe('Test User Creation', () => {
	let connection;
	beforeAll(async () => {
		connection = await connect();
	});
	beforeEach(async () => {
		await connection.cleanup();
	});
	afterAll(async () => {
		await connection.disconnect();
	});
	//test case
	it('it should create User ', async () => {
		const response = await supertest(app)
			.post('/v1/user/signup')
			.set('content-type', 'application/json')
			.send({
				first_name: 'Jeremiah',
			last_name: 'Fagbemi',
			email: 'dlhsfagbemi21@outlook.com',
			password: 'jerry',
			});
		expect(response.status).toEqual(201);
		expect(response.body).toMatchObject({
			message: 'User Created successfully',
			data: expect.any(Object),
		});
	});
	it('it should check if user exist', async () => {
		const blogUser = await UserModel.create({
			first_name: 'Jeremiah',
			last_name: 'Fagbemi',
			email: 'dlhsfagbemi21@outlook.com',
			password: 'jerry',
		});
		const response = await supertest(app)
			.post('/v1/user/signup')
			.set('content-type', 'application/json')
			.send({
				first_name: 'Jeremiah',
				last_name: 'Fagbemi',
				email: 'dlhsfagbemi21@outlook.com',
				password: 'jerry',
			});
		expect(response.status).toEqual(409);
		expect(response.body).toMatchObject({
			message: 'User already existed',
		});
	});
});
