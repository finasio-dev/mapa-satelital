const GET_ALL_SATELLITES_URL = 'https://api.tinygs.com/v1/satellites';
const GET_SATELLITE_URL = 'https://api.tinygs.com/v1/satellite/';

// Get all satellites from API
const getAllSatellites = async () => {
  const satellites = await fetch(GET_ALL_SATELLITES_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .catch((error) => {
      console.warn(error);
    });
  return satellites;
};

// get a satellites by id
const getSatelliteById = async (id) => {
  const satellite = await fetch(`${GET_SATELLITE_URL}${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
    .catch((error) => {
      console.warn(error);
    });
  return satellite;
};
