const apiKey = '25bf840eb5c39fdf1dfb180bbcd073e6'; // Replace with your OpenWeather API key

// Function to get weather by city name
function getWeather() {
  const city = document.getElementById('city').value;
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'none'; // Hide error message
  
  if (city) {
    document.getElementById('loading').style.display = 'block'; // Show loading
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        if (data.cod === 200) {
          displayWeather(data);
        } else {
          displayError('City not found. Please try again.');
        }
      })
      .catch(error => {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        console.error('Error fetching weather data:', error);
        displayError('An error occurred while fetching weather data. Please try again.');
      });
  } else {
    displayError('Please enter a city name.');
  }
}

// Function to get weather by user's current location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      document.getElementById('loading').style.display = 'block'; // Show loading
      fetch(url)
        .then(response => response.json())
        .then(data => {
          document.getElementById('loading').style.display = 'none'; // Hide loading
          if (data.cod === 200) {
            displayWeather(data);
          } else {
            displayError('Could not fetch weather for your location.');
          }
        })
        .catch(error => {
          document.getElementById('loading').style.display = 'none'; // Hide loading
          console.error('Error fetching weather data for location:', error);
          displayError('An error occurred while fetching weather data.');
        });
    });
  } else {
    displayError('Geolocation is not supported by this browser.');
  }
}

// Function to display weather data
function displayWeather(data) {
  const cityName = document.getElementById('city-name');
  const weatherDescription = document.getElementById('weather-description');
  const temp = document.getElementById('temp');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('wind-speed');
  const weatherIcon = document.getElementById('weather-icon');

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Icon URL

  cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
  weatherDescription.textContent = `Conditions: ${data.weather[0].description}`;
  temp.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  document.getElementById('weather-info').style.display = 'block'; // Show weather info
}

// Function to display error messages
function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;

  document.getElementById('weather-info').style.display = 'none'; // Hide weather info
}
