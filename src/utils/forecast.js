const request = require("request");

const forecast = (latitude, longhitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1159eba7dc9f6a2491e2d453b308b9f4&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longhitude);

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!!!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}.
        The temperature today is ${body.current.temperature} °C. It feels like " ${body.current.feelslike}°C.
        A windspeed of ${body.current.wind_speed} Kmph in a direction of ${body.current.wind_dir}.`
      );
    }
  });
};

module.exports = forecast;
