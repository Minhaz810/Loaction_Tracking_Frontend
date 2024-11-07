import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const Map = ({ coordinates }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCpVW4pd1ODof-QddwmH7VVGighYKMNwQk',
    libraries,
  });
  

  const [center, setCenter] = useState({
    lat: 23.777176,
    lng: 90.399452,
  });

  useEffect(() => {
    if (coordinates.length > 0) {
      setCenter({
        lat: coordinates[0].latitude,
        lng: coordinates[0].longitude,
      });
    }
  }, [coordinates]);


  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }
  console.log(coordinates)
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
    >
      {coordinates.map((coordinate, index) => (
        <MarkerF key={index} position={{
          lat: coordinate?.latitude,
          lng: coordinate?.longitude,
        }
        } />
      ))}


    </GoogleMap>
  );
};

export default Map;
