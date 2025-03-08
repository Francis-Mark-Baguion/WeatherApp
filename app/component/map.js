import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";


const Leaflet = dynamic(() => import("leaflet"), { ssr: false });
import "leaflet/dist/leaflet.css"; 

const Map = ({ lat, lon }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const leafletMap = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([import("leaflet")]).then(([L]) => {
        try {
          
          const customIcon = L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", 
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", 
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          if (!leafletMap.current && mapRef.current) {
            
            leafletMap.current = L.map(mapRef.current).setView([lat, lon], 10);

            L.tileLayer(
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              {
                attribution: '&copy; <a href="https://www.esri.com/">Esri</a> & contributors',
              }
            ).addTo(leafletMap.current);

            
            markerRef.current = L.marker([lat, lon], { icon: customIcon }).addTo(
              leafletMap.current
            );
          } else {
            
            leafletMap.current.setView([lat, lon], 10);
            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lon]);
            }
          }
        } catch (error) {
          console.error("Error initializing or updating Leaflet map:", error);
        }
      });
    }
  }, [lat, lon]); 

  return (
    <div
      className="h-full w-full"
      ref={mapRef}
      style={{ height: "100%" }}
    ></div>
  );
};

export default Map;