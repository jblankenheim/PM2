
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { Route, Routes } from 'react-router-dom';

import { listLocations } from './graphql/queries';
import Home from './Home';


const client=generateClient();
function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
 
    fetchLocations();
  
  
  }, []);
  async function fetchLocations() {
    try {
      const locationData = await client.query({
        query: listLocations
      });
      const locations = locationData.data.listLocations.items;
      setLocations(locations);
    } catch (err) {
      console.log('error fetching locations');
    }
  }
 
    return (
    <div className="App">
 
      <Routes>
          <Route path="/" element={<Home locations={locations}/>} />
        
      </Routes>
  </div>
    );
  }
  
  export default App
