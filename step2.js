const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		else {
			console.log(data);
		}
	});
}

async function webCat(url) {
	try {
		await axios.get(url).then(function(resp) {
			console.log(resp.data);
		});
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
		process.exit(1);
	}
}

if (process.argv[2].includes('http')) {
	console.log('webCat');
	webCat(process.argv[2]);
}
else {
	console.log('cat');
	cat(process.argv[2]);
}
