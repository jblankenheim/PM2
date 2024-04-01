
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Route, Routes } from 'react-router-dom';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { listLocations } from "./graphql/queries";

import Home from './Home.js'
import LocationPage from './LocationPage.js';
import ServiceDates from './ServiceDates.js';



const client = generateClient();


function App({ signOut, user }) {



 
const [locations, setLocations] = useState([]);
 

useEffect(() => {
 
  fetchLocations();


}, []);
//////////////////////////////////

async function fetchLocations() {
  try {
    const locationData = await client.graphql({
      query: listLocations
    });
    const locations = locationData.data.listLocations.items;
    setLocations(locations);
  } catch (err) {
    console.log('error fetching locations');
  }
}
console.log(user.data)
  return (
  <div className="App">
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut} >Sign out</button>
      
    </>
    
    <Routes>
        <Route path="/" element={<Home locations={locations}/>} />
        <Route path="/LocationPage/:location" element={<LocationPage />} />
        <Route path="/ServiceDates/:id" element={<ServiceDates />}/>
    </Routes>
</div>
  );
}

export default withAuthenticator(App, {hideSignup: true});