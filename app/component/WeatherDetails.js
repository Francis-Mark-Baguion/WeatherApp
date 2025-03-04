import React from "react";
import { GiWindSlap, GiCompass } from "react-icons/gi";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { MdAir } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import Map from "./Map"; // Import the new Map component

const WeatherDetails = ({ data }) => {
  if (!data?.current || !data?.location) {
    return null;
  }

  return (
    <div className="p-12">

      <h1 className="mb-4 text-2xl text-white italic font-bold">Weather Details</h1>

      {/* Weather Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center italic font-bold">
        <WeatherItem title="Wind Speed" value={`${data.current.wind_mph} mph`} icon={<GiWindSlap size={40} />} />
        <WeatherItem title="Humidity" value={`${data.current.humidity}%`} icon={<WiHumidity size={40} />} />
        <WeatherItem title="Wind Direction" value={data.current.wind_dir} icon={<GiCompass size={40} />} />
        <WeatherItem title="Sunrise" value={data?.forecast?.forecastday?.[0]?.astro?.sunrise} icon={<BsSunrise size={40} />} />
        <WeatherItem title="Sunset" value={data?.forecast?.forecastday?.[0]?.astro?.sunset} icon={<BsSunset size={40} />} />
        <WeatherItem title="Air Pressure" value={`${data.current.pressure_mb} hPa`} icon={<MdAir size={40} />} />
        <WeatherItem title="Feels Like" value={`${data.current.feelslike_c}°`} icon={<CiTempHigh size={40} />} />
        <WeatherItem title="Visibility" value={`${data.current.vis_km} km`} icon={<FaEye size={40} />} />
      </div>
    </div>
  );
};

// Weather Item Component
const WeatherItem = ({ title, value, icon }) => (
  <div className="bg-white/50 p-3 rounded-lg shadow-sm transition-transform hover:scale-105 flex items-center justify-between w-full">
    <div className="mr-3 text-3xl text-white  ">{icon}</div>
    <div className="flex flex-col items-end">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-1 text-xl font-bold text-white">{value}</div>
    </div>
  </div>
);

export default WeatherDetails;
