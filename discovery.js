const stringifyObject = require('stringify-object');
function sendToDiscovery(query) {
  console.log("discovery_query: "+query);
  return new Promise(function(resolve, reject) {
    var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
    var discovery = new DiscoveryV1({
      username: process.env.DISCOVERY_USERNAME,
      password: process.env.DISCOVERY_PASSWORD,
      version_date: '2017-06-25'
    });

    var environment_id = process.env.ENVIRONMENT_ID;
    var collection_id = process.env.COLLECTION_ID;
    discovery.query({
      environment_id: environment_id,
      collection_id: collection_id,
      query: "title:"+query // only querying the text field
    }, function(error, data) {
        if (error) {
          reject(error);
        } else {
          if (data.results == null) {
            console.log("Your call to Discovery was complete, but it didn't return a response. Try checking your Discovery data format.");
            reject(error);
          } else {
            // console.log("discovery_data: "+stringifyObject(data).replace("\n"," "));
            console.log("resolve: "+[data.results[0].title,data.results[0].text]);
            resolve([data.results[0].title,data.results[0].text]);
          }
        }
    });
  });
}

// sendToDiscovery('What is the shorthand for intents?');

module.exports = sendToDiscovery;
