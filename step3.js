const fs = require('fs');
const axios = require('axios');
const process = require('process');

function provideArg(oldTxt, out) {
	if (out) {
		fs.writeFile(out, oldTxt, 'utf8', function(e) {
			if (e) {
				console.error(`Couldn't write ${out}: ${err}`);
				process.exit(1);
			}
		});
	}
	else {
		console.log(oldTxt);
	}
}

function cat(path, out) {
	fs.readFile(path, 'utf8', function(e, data) {
		if (e) {
			console.error(`Error reading ${path}: ${e}`);
			process.exit(1);
		}
		else {
			provideArg(data, out);
		}
	});
}

async function webCat(url, out) {
	try {
		await axios.get(url).then(function(resp) {
			provideArg(resp.data, out);
		});
	} catch (e) {
		console.error(`Error fetching ${url}: ${e}`);
		process.exit(1);
	}
}

if (process.argv[2] === '--out') {
	out = process.argv[3];
	path = process.argv[4];
}
else {
	path = process.argv[2];
}

if (path.includes('http')) {
	webCat(path, out);
}
else {
	cat(path, out);
}
