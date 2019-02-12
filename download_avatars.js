var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

// request github API for list of contributers
function getRepoContributors(repoOwner, repoName, cb) {
  // fetch the list of contributers from "https://api.github.com/repos/"
  var apiEndPoint = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };
  request(apiEndPoint, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    cb(err, parsedBody);
  });
	
}
//download image by URL
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Downloading images yeah!');
    })
    .pipe(fs.createWriteStream(filePath));
}

//check to see if owner and repo match
if (owner && repo) {
getRepoContributors(owner, repo, function(err, result) {
	if (err){
		console.log('err:', err)
	}
  for (let contributers of result) {
		var filepath = `./avatars/${contributers.login}.jpg`;
		var contURL = contributers.avatar_url;
		downloadImageByURL(contURL, filepath)
	}
});
} else {
	console.log('Enter owner and repo you fool.')
}
  //  console.log(result[i].avatar_url);
  // console.log("Errors:", err);
  // console.log("Result:", result);