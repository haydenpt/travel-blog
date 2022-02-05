import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });
      // from Google Map documentation
      new window.google.maps.Marker({ position: center, map: map });
    
  }, [center, zoom])
  // useEffect that run Google map whenever center or zoom changes

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
