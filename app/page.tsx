"use client";
import React, { useState } from "react";
import Input from "./component/Input";

const Page = () => { //Component names are capitalized.
  interface WeatherData {
    location?: {
      name: string;
      region: string;
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
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `http://api.weatherapi.com/v1/forecast.json?key=88887ddac2c241ca9f2205119250103&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: { key: string; preventDefault: () => void; }) => { // Removed TypeScript type
    if (e.key === "Enter") {
      e.preventDefault();
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
    }
  };

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
      <div className="bg-white/25 w-full flex-col h-full">
        {/* INPUT AND LOGO */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl">
            Weather App
          </h1>
        </div>
        {data.current ? (
          <div className="text-white p-4">
            <h2>Current Weather in {data.location?.name}, {data.location?.region}</h2>
            <p>Temperature: {data.current.temp_c}°C</p>
            <p>Condition: {data.current.condition.text}</p>
            <img src={data.current.condition.icon} alt="Weather Icon" />
          </div>
        ) : error ? (
            <div className = "text-white p-4">
                <p>{error}</p>
            </div>
        ) : null}
      </div>
    </div>
  );
};

export default Page;