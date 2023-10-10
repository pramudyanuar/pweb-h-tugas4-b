function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;
    const apiKey = 'b415db3e92c1437198014856230310';

    if (!location) {
        alert('Please enter a location');
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = document.getElementById('weatherData');
            const { location, current } = data;

            const html = `
                <h2>Weather in ${location.name}, ${location.country}</h2>
                <p>Temperature: ${current.temp_c}°C</p>
                <p>Condition: ${current.condition.text}</p>
                <p>Humidity: ${current.humidity}%</p>
            `;

            weatherData.innerHTML = html;

            changeBackground(current.condition.text);

            const searchDiv = document.getElementById('searchDiv');
            searchDiv.style.display = 'none';

        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function changeBackground(weatherCondition) {
  const body = document.body;

  const backgroundMappings = {
      'Clear': 'url(https://i.ibb.co/GTR1XGv/pexels-francesco-ungaro-281260-1.jpg)',
      'Partly cloudy': 'url(https://i.ibb.co/HdjqgX9/cloudy-background-gyzlbiqodsevez6b.jpg)', 
      'Cloudy': 'url(https://i.ibb.co/fv4y2wg/clouds-from-above.jpg")',
      'Rain': 'url(https://i.ibb.co/PWVSZK6/istockphoto-453684353-612x612.jpg)',
      'Sunny': 'url(https://i.ibb.co/02WPpb5/images.jpg)',
      'Snow': 'url(https://i.ibb.co/HGQvYpf/download.jpg)',
      'Patchy rain possible': 'url(https://i.ibb.co/T0ssmQz/ternyata-ini-penyebab-langit-mendung-sebelum-turun-hujan48.webp)',
      'Mist':'url(https://i.ibb.co/0FNLgnJ/download.jpg)',

  };

  const background = backgroundMappings[weatherCondition];
  if (background) {
      body.style.background = background;
      body.style.backgroundSize = 'cover';
  } else {
      body.style.background = 'url(default.jpg)';
      body.style.backgroundSize = 'cover';
  }
}
