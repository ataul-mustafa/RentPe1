import React, { useEffect, useState } from "react";

function UserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  async function getCityName(latitude, longitude) {
    const apiKey = 'AIzaSyBXL624K-NQy2WD_C3rjKe6FByWOODB_Tw'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results.length > 0) {
        for (let i = 0; i < data.results[0].address_components.length; i++) {
          const component = data.results[0].address_components[i];
          if (component.types.includes('locality')) {
            const city = component.long_name;
            return city;
          }
        }
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error ? (
        <p style={{paddingTop:'65px'}}>{error}</p>
      ) : location ? (
        <p style={{paddingTop:'65px'}}>
          Your current location is: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserLocation;
