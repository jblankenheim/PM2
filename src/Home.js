import Card from 'react-bootstrap/Card';

import { Link} from "react-router-dom";


const Home = ({locations}) => {
 

console.log(locations)

  return (
    <div>
   
      <div style={{ fontWeight: 'bold', margin: '40px 10px 40px' }}>Choose Your Location</div>
      {locations.map((location, index) => (
        <div key={location.id ? location.id : index} >
          <Link to={`/LocationPage/${location.id}`} >
          <Card key={location.id}style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body >{location.locationName}</Card.Body>
            </Card>
          </Link>
        </div>
      ))}
   
    </div>
  )
};

export default Home;