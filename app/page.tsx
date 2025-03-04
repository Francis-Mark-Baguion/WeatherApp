"use client";
import React, { useState, useEffect } from "react";
import Input from "./component/Input";
import Current from "./component/Current";
import WeatherDetails from "./component/WeatherDetails";
import WeatherForecast from "./component/WeatherForecast";
import SearchIcon from '@mui/icons-material/Search';
import Map from "./component/map"; 

const Page = () => {
  interface WeatherData {
    location?: {
      name: string;
      region: string;
      lat: number;
      lon: number;
    };
    current?: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
    };
  }

  const [data, setData] = useState<WeatherData>({});
  const [location, setLocation] = useState("Baybay Leyte");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather("Baybay Leyte"); // Show Baybay Leyte first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        }
      );
    }
  }, []);

  const fetchWeather = async (query: string) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=88887ddac2c241ca9f2205119250103&q=${query}&days=7&aqi=yes&alerts=yes`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Location not found");
      const data = await res.json();
      setData(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setData({});
    }
  };

  const handleSearch = async (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchWeather(location);
    }
  };

  return (
    <div className="bg-cover bg-gradient-to-r bg-gray-800">
      <div className="w-full flex-col bg-gray-900/80 backdrop-blur-lg">
        <div className="bg-white/10 w-full backdrop-blur-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center p-5 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <img src="/weather-app.png" alt="Weather Logo" className="w-12 h-12" />
              <h1 className="text-2xl font-bold text-white tracking-wide">Weather App</h1>
            </div>
            <div className="relative w-full md:w-96 mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search for a city..."
                className="w-full py-2 px-4 text-white bg-white/20 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md placeholder-white/70"
                onKeyDown={handleSearch}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <SearchIcon className="w-5 h-5 text-gray-300 hover:text-white transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-12 flex flex-col">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 w-full">
            <Current data={data} />
            <div className="mt-6">
              <WeatherForecast data={data} />
            </div>
          </div>
          <div className="md:w-2/3 w-full flex flex-col h-[500px] md:h-[800px] lg:h-[1000px]">
            <div className="relative rounded-3xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 p-6 flex-1 flex flex-col items-center justify-center">
              {data.location && <Map lat={data.location.lat} lon={data.location.lon} />}
              <div className="mt-6 text-white text-center">
                <h2 className="text-2xl font-bold">Weather Map Overview</h2>
                <p className="mt-2 text-lg text-white/80">
                  Stay updated with real-time weather conditions using our interactive weather map.
                  Explore temperature changes, precipitation patterns, and wind movements across different locations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>
      </div>
      <footer className="bg-gray-900/80 text-white text-center py-4 mt-10 backdrop-blur-lg">
        <p className="text-sm">© {new Date().getFullYear()} Weather App. All rights reserved.</p>
        <p className="text-xs text-gray-400">
          Data provided by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">WeatherAPI.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Page;