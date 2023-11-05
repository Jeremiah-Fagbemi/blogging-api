const app = require('./app.js');
const db = require('./db');
const PORT = process.env.PORT;

db.connect();
app.listen(PORT, () => {
	console.log('Server Started');
});
