const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  request("https://api64.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null); // Print the error if one occurred
    }
    if (response.statusCode !== 200) {
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      ); // Print the response status code if a response was received
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    if (error) {
      return callback(error, null); // Print the error if one occurred
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const errorMessage = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(errorMessage, null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
