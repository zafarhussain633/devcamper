import  NodeGeocoder  from 'node-geocoder';

const options = {
    provider: 'mapquest',
  
    // Optional depending on the providers
    // fetch: customFetchImplementation,
    apiKey: process.env.MAPQUEST_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };


  const geocoder = NodeGeocoder(options);

  const getGeolocation =async  (address)=>{
    const res = await geocoder.geocode(address);
    return res;
  }

  export default getGeolocation

