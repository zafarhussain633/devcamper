import  NodeGeocoder  from 'node-geocoder';

const options = {
    provider: process.env.GEOCODE_PROVIDER,
    apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  const getGeolocation =async  (address)=>{
    const res = await geocoder.geocode(address); 
    return res;
  }

  export default getGeolocation

