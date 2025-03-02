"use client";
import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Input from "./component/Input";
import Current from "./component/Current";
import WeatherDetails from "./component/WeatherDetails";
import WeatherForecast from "./component/WeatherForecast";

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
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const mapRef = useRef<HTMLDivElement | null>(null);

  const url = `http://api.weatherapi.com/v1/forecast.json?key=88887ddac2c241ca9f2205119250103&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: { key: string; preventDefault: () => void }) => {
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

  useEffect(() => {
    // Initialize the map when the component mounts and when data changes
    if (data.location && mapRef.current) {
      const map = L.map(mapRef.current).setView(
        [data.location.lat, data.location.lon],
        10
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([data.location.lat, data.location.lon]).addTo(map);
    }
  }, [data]);

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
        <div className="flex md:flex-row flex-col p-12  items-center justify-between">
          <Current data={data} />
          <WeatherForecast data={data} />
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>

        {/* Map container */}
        <div className="h-[400px] w-full" ref={mapRef}></div>
      </div>
    </div>
  );
};

export default Page;