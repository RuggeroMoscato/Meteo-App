import React, { useState } from 'react';
import axios from 'axios'



function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {

        setData(response.data)
        console.log(response.data)

      })
      setLocation("")
    }
  }
  function toCelsius(data) {
    return ((data - 32) * 5 / 9).toFixed(2);
  }
  return (
    <div className="app">
      <div className="search">
        <input value={location} onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Inserisci la città' type='text' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <p className='big'> {data.main.temp.toFixed()}°F</p> : null}
            {data.main ? <p className='big'>{toCelsius(data.main.temp.toFixed())}°C</p> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{toCelsius(data.main.temp.toFixed())}°C</p> : null}
            <p>Percepiti</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold' >{data.main.humidity}%</p> : null}
            <p>umidità</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
            <p>vento</p>
          </div>
        </div>


      </div>


    </div>
  );
}

export default App;
