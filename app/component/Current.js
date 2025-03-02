import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Assuming you have a currentDate.js or currentDate.ts file with this function
const getCurrentDate = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString(undefined, options);
};

const Current = ({ data }) => {
  const weatherIcon = data?.current?.condition?.icon;
  const currentDate = getCurrentDate();

  return (
    <div className="flex flex-col mb-8 md:mb-0 items-start gap-2 bg-black/25 p-6 rounded-xl">
      <div className="flex items-center">
        <div className="">
          <h1 className="text-3xl text-white">Today</h1>
          <p className="text-white">{currentDate}</p>
        </div>
        {weatherIcon && (
          <div>
            <img className="w-[50px] object-cover" src={weatherIcon} alt="Weather Icon" />
          </div>
        )}
      </div>
      <div>
        {data?.current?.temp_f !== undefined && (
          <p className="text-5xl text-white">
            {data.current.temp_c.toFixed()}
            <span>°</span>
          </p>
        )}
        {data?.current?.condition?.text && (
          <span className="text-white">{data.current.condition.text}</span>
        )}
      </div>
      <div>
        {data?.location?.name && (
          <div className="flex items-center text-black bg-white/90 px-2 py-2 rounded-xl">
            <LocationOnIcon />
            <span>
              {data.location.name}, {data.location.region}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Current;