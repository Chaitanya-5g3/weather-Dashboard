import React from 'react';

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const temp = unit === 'C' ? data.current.temp_c : data.current.temp_f;
  const condition = data.current.condition.text;

  return (
    <div className="weather-card">
      <h3>{data.location.name}</h3>
      <img src={data.current.condition.icon} alt={condition} />
      <p>{condition}</p>
      <p>Temperature: {temp}°{unit}</p>
    </div>
  );
};



export default WeatherCard;
