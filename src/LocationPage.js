
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

import { format } from 'date-fns';

import { generateClient } from 'aws-amplify/api';
import { getLocation } from "./graphql/queries";
import { equipmentByLocationID } from "./graphql/queries";

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import AddServiceDate from "./AddServiceDate";
import ServiceDates from './ServiceDates';


const client = generateClient();


const LocationPage = () => {
  const params = useParams();
  const location = params.location;
  console.log("The facility is" + `${location}`)
  ////setting state variables
  const [facility, setFacility] = useState('');
  const navigate = useNavigate();


  ///setting equipment array for use in updating equipment list.  Could not pull items directly from DOM

  const [equipmentList, setEquipmentList] = useState([]);
  //////////////////////////////////////////////////////////////setting Modal State
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;
  const[modalEquip, setModalEquip]=useState("");


  function openModal() {
  
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

//////////////////////////////////////////////////
//setting state for data passed to Service Dates Link
const[serviceDateData, setServiceDateData] = useState([]);





  /////////////////////////////////////////////////////////////////////
  ///setting facility data
  useEffect(() => {
    getfacility();
    getEquipment();

  }, []);



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Get facility function to update facility data

  async function getfacility() {

    try {
      //query graphql using imported query for facility data.  used appsync to edit query
      const facilityData = await client.graphql({
        query: getLocation,
        variables: { id: `${location}` }

      });
      const facdata = facilityData.data.getLocation;
      setFacility(facdata);
      console.log(facdata);


    } catch (err) {
      console.log('error fetching facility');
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //get equipment function.  I believe this can be farmed out of facility data, but it works now, so im not touching it.  It would be less API calls to just
  // gleen this out of facility data though.  Also, data types matter.  Equipment.items gives an indexed array, so set state with an empty array
  async function getEquipment() {

    try {
      //query graphql using imported query for facility data.  used appsync to edit query
      const equipmentData = await client.graphql({
        query: equipmentByLocationID,
        variables: { locationID: `${location}` }

      });
      var equipdata = equipmentData.data.equipmentByLocationID.items;
      setEquipmentList(equipdata);
      console.log(equipdata)
      //testing in console


    } catch (err) {
      console.log('error fetching equipment');
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //separating console logging code to be able to analyze better
  //////////////////////////////////////////////////////
  console.log(facility.Name);
  console.log(facility)
  console.log("*************************************************************************************************************")
  console.log(equipmentList)
  //testing for existence of array
  console.log("Equipment data is #" + equipmentList.length)
  console.log("the equipment List is "+ equipmentList)
///////////////////////////////////////////
//setting state to send to link
////////////////////


  return (
  //  <div>Welcome to {facility.Name}</div> //just used this line as test while I blocked everything else off
   <body style={{ backgroundColor: "#2067b3" }}>
      <div style={{ fontWeight: "bold", fontSize: "150%" }}>
        Welcome to {facility.Name}
        <h1 style={{ fontSize: "150%", fontWeight: "bold", textAlign: "center", textDecoration: "underline" }}>Equipment</h1>
      </div>


      <Container fluid style={{flexWrap: "wrap"}} >

        <row style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
          {equipmentList.map((Equipment, index) => {
            return (
              <Col md="auto" key={Equipment.id ? Equipment.id : index}>

                  
                <div key={Equipment.id} class="card" style={{ borderStyle: "double", borderRadius: "25px", width: "auto" }}>
                  <Card class="card-body" style={{ margin: "auto auto auto 10%" }}>
                    <h2 class="card-title" style={{ fontSize: "24" }}> {Equipment.name}</h2>
                    <p class="card-text" style={{ margin: "2% 25% 2% 2%" }}>Equipment ID: {Equipment.id}</p>
                    <p style={{ fontWeight: "bold" }} > Bearing Size:  &nbsp;&nbsp;&nbsp; &nbsp; {Equipment.BearingSize}</p>
                    <p style={{ fontWeight: "bold" }}> Drive Belt Size: &nbsp;{Equipment.DriveBeltSize}</p>
                    <p style={{ fontWeight: "bold" }}> Gear Box Size:  &nbsp; {Equipment.GearBoxSize}</p>
                    
                    <p style={{ fontWeight: "bold" }}> <Link to={{pathname: `/ServiceDates/${Equipment.id}`, state: {id : Equipment.id}}}>Last Service Date:  &nbsp; {Equipment.ServiceDates.items? format(Equipment.ServiceDates.items[0].createdAt, "yyyy-MM-dd") : "not showing a date"}</Link></p>    
                   
                    <button key = {Equipment.id} value={Equipment} style={{ backgroundColor: "#21702f", borderRadius: "5px" }}  onClick={(e)=>{setModalEquip(Equipment); openModal()}}>Add Service Date</button> <br/>
                    <label for="notes" style={{fontWeight: "bold", color: "#e35a0b"}}>Latest Notes</label> <br/>
                    <textarea name="notes" rows="4" style={{width: "90%", backgroundColor: "#92969c" }}value={Equipment.ServiceDates.items[1].notes} readOnly={true}></textarea>
                    <Modal 
                  
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      
                      contentLabel="Example Modal"
                    >
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                      <button onClick={closeModal}>close</button>
                      <AddServiceDate modalIsOpen={modalIsOpen} Equipment={modalEquip} />
                  
                    </Modal>

                  </Card>
                </div>
              </Col>
            )
          }
          )
          }

        </row>
      </Container>

    </body >
  )
}
export default LocationPage;