var request = require('request');
var secrets = require('./secrets');

// request github API for list of contributers
function getRepoContributors(repoOwner, repoName, cb) {
  // fetch the list of contributers from "https://api.github.com/repos/"
  var apiEndPoint = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets
    }
  };
  request(apiEndPoint, function(err, res, body) {
    var parsedBody = JSON.parse(body);
		cb(err, parsedBody);
  });
	
			
}
  

getRepoContributors("jquery", "jquery", function(err, result) {
	for (var i = 0; i < result.length; i++) {
		console.log(result[i].avatar_url);
		// console.log("Errors:", err);
		// console.log("Result:", result);
	}

});

console.log('Welcome to the GitHub Avatar Downloader!');