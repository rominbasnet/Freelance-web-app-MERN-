// import { useState, useEffect} from 'react';
// import axios from 'axios';
// import './map.css';

// import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';

// const Map =() => {
//   const [count, setCount] = useState(0);
//   const [location, setUserLocation] = useState({ lat: 0, lng: 0 })
//   const [freelancersNear, setFreelancersNear] = useState(null);
//   const [data, setData] = useState([]);


//   useEffect(() => {

//   const  getFreelancers = async () =>{
//       const response = await axios.get('http://localhost:8000/freelancer/allprofiles');
//       console.log(response.data[0]?.freelancer?.address?.coordinates)
//       setData(response.data);
//     }
//     getFreelancers();




//     function haversineDistance(lat1, lon1, lat2, lon2) {
//       const R = 3958.8; // Earth's radius in miles
//       const dLat = toRadians(lat2 - lat1);
//       const dLon = toRadians(lon2 - lon1);
//       const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                 Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//                 Math.sin(dLon / 2) * Math.sin(dLon / 2);
//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//       const distance = R * c;
//       return distance;
//     }

//     function toRadians(degrees) {
//       return degrees * (Math.PI / 180);
//     }

 
// const a="sfsdf"

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//          console.log(a)
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });

//   //   const freelancers = [
//   //   { name: 'Freelancer 1', category: 'Software Developer', lat: 26.4540688, lng:  87.2745466},
//   //   { name: 'Freelancer 2', category: 'Software Developer', lat: 26.4820658, lng: 87.2681082 },
//   //   { name: 'Freelancer 3', category: 'Software Developer', lat: 26.4741768, lng: 87.2739687}
//   // ];
//               // Calculate distance between your location and each freelancer's location
//   const distanceThreshold = 80; // miles
//   const freelancersNearMe = data.filter(function(freelancer) {
//     const distance = haversineDistance(position.coords.latitude, position.coords.longitude, freelancer?.freelancer?.address.coordinates[1], freelancer.freelancer?.address?.coordinates[0]);
//     return distance <= distanceThreshold;
//   });

// setFreelancersNear(freelancersNearMe)


// console.log(freelancersNearMe)






//       },
//       (error) => {
//         console.error(`ERROR(${error .code}): ${error.message}`);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, []);



//   return (
 

// <MapContainer center={[28.394, 84.124]} zoom={8} scrollWheelZoom={true}>
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[location.lat, location.lng]}>
//     <Popup>
//       This is you
//     </Popup>
//   </Marker>


// {freelancersNear?.map((location, i)=>{
// return (
//   <Marker key={i} position={[location.lat, location.lng]}>
//     <Popup>
//     {location.category}  
//     </Popup>
//   </Marker>

//   )

// })}


// </MapContainer>

//   )
// }

// export default Map;


import { useState, useEffect } from 'react';
import './map.css';
import axios from 'axios';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';

const Map = () => {
  const [count, setCount] = useState(0);
  const [location, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [freelancersNear, setFreelancersNear] = useState(null);
  const [freelancers, setFreelancers] = useState([]);

const redIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

  useEffect(() => {
    function haversineDistance(lat1, lon1, lat2, lon2) {
      const R = 3958.8; // Earth's radius in miles
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }

    function toRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        axios
          .get('http://localhost:8000/freelancer/allprofiles')
          .then((response) => {
            const data = response.data;
          

            const distanceThreshold = 30; //value miles ma hunxa 1 mile === 1.6 km
            const freelancersNearMe = data.filter(function (
              freelancer
            ) {
              console.log(freelancer?.freelancer?.address.coordinates[0]);
              console.log(freelancer?.freelancer?.address.coordinates[1])
              const distance = haversineDistance(
                position.coords.latitude,
                position.coords.longitude,
                freelancer?.freelancer?.address.coordinates[1],
                freelancer?.freelancer?.address.coordinates[0]
              );
              return distance <= distanceThreshold;
            });
           console.log(freelancersNearMe)
            setFreelancersNear(freelancersNearMe);
  
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (error) => {
        console.error(`ERROR(${error.code}): ${error.message}`);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <MapContainer center={[28.394, 84.124]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]} icon={redIcon}>
        <Popup>This is you</Popup>
      </Marker>

      {freelancersNear?.map((location, i) => {


        return (
          <Marker key={location._id}  position={[location?.freelancer?.address.coordinates[1],location?.freelancer?.address.coordinates[0] ]}>
            <Popup key={location._id} >
            <div className="flex gap-3 align-center">
             <img className=" rounded-full h-16 w-16 m-1 p-1 border-1 border-sky-500" src={`http://localhost:8000/${location?.image}`} alt="Freelancers Profile Image" />
              <p className="font-bold text-green-600">{location?.specialization}</p>
            </div>
              <p className="font-bold text-blue-600">Name: {location?.freelancer?.firstName} {location?.freelancer?.lastName}</p>
              <p className="font-bold text-blue-600">Email: {location?.freelancer?.email}</p>
              <div className="flex items-center"> 
              {location?.skills.map((s)=>{
                return  (
                  <>
                  
                  <p className="bg-green-300 text-gray-900 rounded-full px-3 py-1 font-mono font-bold text-sm">{s}</p>
                
                  </>
                )
              })}
              </div>
              </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
