// Twitter Bot that will tweet temperatures using Open Weather API

// Cities include: 
// 1. SF, NYC, LA, Chicago, Houston, Phoenix, Philly, Austin
// 2. Boston, San Antonio, San Diego, Dallas, SJ, Jacksonville
// 3. Columbus, Indianopolis, Memphis, Portland, Detroit
// 4. Denver, Seattle, Las Vegas, Atlanta, Miami

// Testing Purposes:
console.log('Weather Bot Starting Up')

// Requires
var Twit = require('twit'); // Add your own API keys for your own twitter to try it out. 
var config = require('./config'); // Hide API keys
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var accessKey = '758828a9696872e139eab35bee96096e';

// Twitter
var T = new Twit(config);
setInterval(sendTweet, 1000 * 60 * 30); // Is set to send every 60
var stream = T.stream('user');
stream.on('tweet', tweetedAtMe);
sendTweet();

function sendTweet() {

	var listOfCityIDs = ['5391959', '5128638', '5368361', '4887398', '4391354', '4905873', '4440906', '4099974', '4183849',
	 '4171771', '4726311', '4190598', '5392171', '4069553','4269841', '4861716', '4164047', '5746545', '4990729', '5419384',
	  '5809844', '5506956', '4671576', '4542692'];

	var listOfEmojis = [];
	var listOfTemperatures = [];
	
	for(var i = 0; i < listOfCityIDs.length; i++) {

		function Get(url) {
			var httpRequest = new XMLHttpRequest();
			httpRequest.open("GET", url, false);
			httpRequest.send(null);
			return httpRequest.responseText;
		}

		var accessToken = accessKey;
		var requestURL = 'http://api.openweathermap.org/data/2.5/weather?id=' + listOfCityIDs[i] + '&units=imperial&appid=' + accessToken;

		var jsonObject = Get(requestURL);
		var obj = JSON.parse(jsonObject);

		// Add "emojis" to the status

		if(obj.weather[0].description.includes('tornado')) {
			listOfEmojis.push('🌪');
		} else if(obj.weather[0].description.includes('thunderstorm')) {
			listOfEmojis.push('🌩');
		} else if(obj.weather[0].description.includes('snow')) {
			listOfEmojis.push('🌨');
		} else if(obj.weather[0].description.includes('drizzle') || obj.weather[0].description.includes('rain')) {
			listOfEmojis.push('🌧');
		} else if(obj.weather[0].description.includes('fog') || obj.weather[0].description.includes('haze') 
		|| obj.weather[0].description.includes('mist')) {
			listOfEmojis.push('🌫');
		} else if(obj.weather[0].description.includes('cloud')) {
			listOfEmojis.push('☁️');
		} else {
			listOfEmojis.push('🌥');
		}

		//Add temperature in degrees to the status

		listOfTemperatures.push(obj.main.temp + '°');
	}

	firstTweetToSend = {
		status: 'San Francisco: ' + listOfTemperatures[0] + ' ' + listOfEmojis[0] +'\
		New York: ' + listOfTemperatures[1] + ' ' + listOfEmojis[1] + '\
		Los Angeles: ' + listOfTemperatures[2] + ' ' + listOfEmojis[2] + '\
		Chicago: ' + listOfTemperatures[3] + ' ' + listOfEmojis[3] + '\
		Houston: ' + listOfTemperatures[4] + ' ' + listOfEmojis[4] + '\
		Phoenix: ' + listOfTemperatures[5] + ' ' + listOfEmojis[5] + '\
		Philadelphia: ' + listOfTemperatures[6] + ' ' + listOfEmojis[6] + '\
		Austin: ' + listOfTemperatures[7] + ' ' + listOfEmojis[7]
	}

	secondTweetToSend = {
		status: 'Boston: ' + listOfTemperatures[8] + ' ' + listOfEmojis[8] + '\
		San Antonio: ' + listOfTemperatures[9] + ' ' + listOfEmojis[9] + '\
		San Diego: ' + listOfTemperatures[10] + ' ' + listOfEmojis[10] + '\
		Dallas: ' + listOfTemperatures[11] + ' ' + listOfEmojis[11] + '\
		San Jose: ' + listOfTemperatures[12] + ' ' + listOfEmojis[12] + '\
		Jacksonville: ' + listOfTemperatures[13] + ' ' + listOfEmojis[13]
	}

	thirdTweetToSend = {
		status: 'Columbus: ' + listOfTemperatures[14] + ' ' + listOfEmojis[14] + '\
		Indianopolis: ' + listOfTemperatures[15] + ' ' + listOfEmojis[15] + '\
		Memphis: ' + listOfTemperatures[16] + ' ' + listOfEmojis[16] + '\
		Portland: ' + listOfTemperatures[17] + ' ' + listOfEmojis[17] + '\
		Detroit: ' + listOfTemperatures[18] + ' ' + listOfEmojis[18]
	}

	fourthTweetToSend = {
		status: 'Denver: ' + listOfTemperatures[19] + ' ' + listOfEmojis[19] + '\
		Seattle: ' + listOfTemperatures[20] + ' ' + listOfEmojis[20] + '\
		Las Vegas: ' + listOfTemperatures[21] + ' ' + listOfEmojis[21] + '\
		Atlanta: ' + listOfTemperatures[22] + ' ' + listOfEmojis[22] + '\
		Miami: ' + listOfTemperatures[23] + ' ' + listOfEmojis[23] + ' ' + '#weather'
	}

	T.post('statuses/update', firstTweetToSend, tweetSent);

	setTimeout(function() { T.post('statuses/update', secondTweetToSend, tweetSent) }, 5000); // Will send after 5 seconds

	setTimeout(function() { T.post('statuses/update', thirdTweetToSend, tweetSent) }, 10000); // Will send after 10 seconds

	setTimeout(function() { T.post('statuses/update', fourthTweetToSend, tweetSent) }, 15000); // Will send after 15 seconds

	function tweetSent(err, data, response) {
		if(err) {
			console.log('Received error for sending a tweet.');
		} else {
			console.log('Posted successfully on Twitter.');
		}
	}
	
}

function tweetedAtMe(eventMsg) {

	var replyTo = eventMsg.in_reply_to_screen_name;
	var textSent = eventMsg.text;
	var textFrom = eventMsg.user.screen_name;

	if(replyTo == 'USA_WeatherBot') {
		var trimmedText = textSent.substring(16, textSent.length);

		function Get(url) {
				var httpRequest = new XMLHttpRequest();
				httpRequest.open("GET", url, false);
				httpRequest.send(null);
				return httpRequest.responseText;
		}

		var accessToken = accessKey;
		var requestURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + trimmedText + ',us&units=imperial&appid=' + accessToken;

		var jsonObject = Get(requestURL);

		if(jsonObject != undefined) {
				var obj = JSON.parse(jsonObject);
				var description;
				description = obj.weather[0].description;

			if(obj.weather[0].description.includes('tornado')) {
				description = '🌪';
			} else if(obj.weather[0].description.includes('thunderstorm')) {
				description = '🌩';
			} else if(obj.weather[0].description.includes('snow')) {
				description = '🌨';
			} else if(obj.weather[0].description.includes('drizzle') || obj.weather[0].description.includes('rain')) {
				description = '🌧';
			} else if(obj.weather[0].description.includes('fog') || obj.weather[0].description.includes('haze') 
			|| obj.weather[0].description.includes('mist')) {
				description = '🌫';
			} else if(obj.weather[0].description.includes('cloud')) {
				description = '☁️';
			} else {
				description = '🌥';
			}

			replyToSend = {
				status: '@' + textFrom + ' ' + trimmedText + ': ' + obj.main.temp + '°' + ' ' + description + ' #weather'
			}
		}

		else {
			replyToSend = {
				status: '@' + screenName + ' Sorry could not find the temperature, look in the bio for the way to send your city!'
			}
		}

		T.post('statuses/update', replyToSend, replySent);
		stream.stop();
		stream = T.stream('user');
		stream.on('tweet', tweetedAtMe);

		function replySent(err, data, response) {
			if(err) {
				console.log('Received error for posting a reply.');
			} else {
				console.log('Replied successfully to ' + textFrom + ' on Twitter.');
			}
		}
	}
}