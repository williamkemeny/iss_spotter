const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api64.ipify.org?format=json");
};

const fetchCoordsByIP = function (ip) {
  return request("http://ipwho.is/" + ip);
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const issNextPassover = function (body) {
  const response = JSON.parse(body).response;
  for (const pass of response) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then((body) => fetchCoordsByIP(JSON.parse(body).ip))
    .then(fetchISSFlyOverTimes)
    .then(issNextPassover);
};

module.exports = {
  nextISSTimesForMyLocation,
};
