# WeatherBot
Tweets temperatures every 20 minutes, and when it is @mentioned with a city name.

Bot.js is the main file in which I create a Twitter Object that is able to connect to the Twitter API using private access keys. After being able to connect to the Twitter API, I parse data using the OpenWeather API in which I give pre-looked up cityID's in order to received data.

When a user tweets at me, I receive the message and am able to connect the message with the "regular path" to send to the OpenWeather API.

# Languages Used:
- Javascript
- Node.js
