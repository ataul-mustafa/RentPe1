import React, { useEffect, useState } from "react";

function UserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  

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
