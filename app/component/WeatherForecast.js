import React from 'react';

const WeatherForecast = ({ data }) => {
  if (!data?.forecast) {
    return null;
  }

  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 p-4">
      {/* Header */}
      <h2 className="text-white text-xl font-bold text-center mb-4">Daily Forecast</h2>

      <div className="flex flex-col gap-3 w-full">
        {data.forecast.forecastday.map((day, index) => (
          <div
            key={index}
            className="bg-gray-500/40 flex items-center justify-around p-2 rounded-xl shadow-md"
            role="group"
            aria-label={`Forecast for ${new Date(day.date).toLocaleString("en-US", { weekday: "short" })}`}
          >
            {/* Weather Icon */}
            <img
              className="w-10 h-10"
              src={day?.day?.condition?.icon}
              alt={day?.day?.condition?.text}
              aria-label={day?.day?.condition?.text}
            />

            {/* Condition Text (Middle) */}
            <p className="text-sm text-white font-medium text-center">{day?.day?.condition?.text}</p>

            {/* Temperature & Date */}
            <div className="text-right">
              <p className="text-lg font-semibold italic text-white">
                {new Date(day.date).toLocaleString("en-US", { weekday: "short" })}
              </p>
              <p className="text-sm text-white/80">High: {day?.day?.maxtemp_c?.toFixed()}°</p>
              <p className="text-sm text-white/80">Low: {day?.day?.mintemp_c?.toFixed()}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
