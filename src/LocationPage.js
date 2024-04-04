
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

import { generateClient } from 'aws-amplify/api';
import { getLocation } from "./graphql/queries";
import { createEquipment } from './graphql/mutations';
import { updateEquipment } from './graphql/mutations';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AddServiceDate from './AddServiceDate';
import { Card } from 'react-bootstrap';



const client = generateClient();


const LocationPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = params.location;
  
  ////setting state variables
  const [facility, setFacility] = useState([]);



  ///setting equipment array for use in updating equipment list.  Could not pull items directly from DOM

  const [equipmentList, setEquipmentList] = useState([]);
  //////////////////////////////////////////////////////////////setting Modal State
  const [modalIsOpen, setIsOpen] = useState(false);
  let subtitle;
  const [modalEquip, setModalEquip] = useState([]);
  /////////////////////////////////////////////////////////////////////////////////////

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







  /////////////////////////////////////////////////////////////////////
  ///setting facility data
  useEffect(() => {
    getfacility();


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
      const equipdata = facdata.Equipment.items;
      setFacility(facdata);
      console.log(facdata);
      setEquipmentList(equipdata)

    } catch (err) {
      console.log('error fetching facility');
      console.log("the location id is" + location)
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  console.log(facility.Name);
  console.log(facility)
  console.log("*************************************************************************************************************")
  console.log(equipmentList)
  //testing for existence of array
  console.log("Equipment data is #" + equipmentList.length)
  console.log("the equipment List is " + equipmentList)
  ///////////////////////////////////////////
  //setting state to create new equip

  const [newEquipModalIsOpen, setNewEquipModalIsOpen] = useState(false);
  const [modalNewEquipName, setModalNewEquipName] = useState("");

  /////////////////////////////////////////////////////////////////////////////////////

  function openNewEquipModal() {

    setNewEquipModalIsOpen(true);
  }

  function afterOpenNewEquipModal() {

    // references are now sync'd and can be accessed.

  }

  function closeNewEquipModal() {
    setNewEquipModalIsOpen(false);
  }
  ///////////////////////////////////////////////////////
  ////////creating function to update equipmet///////////////////////////////

  const newEquipDetails = {
    name: `${modalNewEquipName}`,
    locationID: `${location}`,
    DriveBeltSize: "",
    BearingSize: "",
    GearBoxSize: "",
    cupSize: "",
  }

  async function submitNewEquipment() {
    try {
      await client.graphql({
        query: createEquipment,
        variables: { input: newEquipDetails }
      }
      );
      //query graphql using imported query for facility data.  used appsync to edit quer

      console.log("Success!");

      //    console.log(response.JSON)
      //testing in console


      //setting equipment function by mining equipment data.  data was indexed at items and needs to be separated and pushed into an array


    } catch (err) {
      console.log('error submitting equipment');

    }

    finally {

      ////////navigating out of modal 
      navigate(0);

    }


  }

  /////////////////////////////////////////////////////
  //////////////////////Creating Modal to update Equipment///////////////////////////////////////
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [updateModalEquipmentID, setUpdateModalEquipmentID] = useState("")
  const[updateModalEquipmentName, setUpdateModalEquipmentName]=useState("");
  const [updateModalBearing, setUpdateModalBearing] = useState("");
  const [updateModalDriveBelt, setUpdateModalDriveBelt] = useState("");
  const [updateModalGearBox, setUpdateModalGearBox] = useState("");
  const [updateModalCupSize, setUpdateModalCupSize] = useState("");
  /////////////////////////////////////////////////////////////////////////////////////





function openUpdateModal() {

  setUpdateModalIsOpen(true);
}

function afterOpenUpdateModal() {

  // references are now sync'd and can be accessed.

}

function closeUpdateModal() {
  setUpdateModalIsOpen(false);
}
//////////details for equipment update///////
const updateEquipDetails = {
  id: `${updateModalEquipmentID}`,
  
  DriveBeltSize: `${updateModalDriveBelt}`,
  BearingSize: `${updateModalBearing}`,
  GearBoxSize: `${updateModalGearBox}`,
  cupSize: `${updateModalCupSize}`,
}


////////////////////////////////////////
async function handleUpdateEquipment() {
  try {
    await client.graphql({
      query: updateEquipment,
      variables: { input: updateEquipDetails }
    }
    );
    //query graphql using imported query for facility data.  used appsync to edit quer

    console.log("Success!");

    //    console.log(response.JSON)
    //testing in consol


  } catch (err) {
    console.log('error updating equipment');

  }

  finally {

    ////////navigating out of modal 
    navigate(0);

  }


}





return (

  <body style={{ backgroundColor: "#2067b3" }}>
    <div style={{ fontWeight: "bold", fontSize: "150%" }}>
      Welcome to {facility.Name}
      <h1 style={{ fontSize: "150%", fontWeight: "bold", textAlign: "center", textDecoration: "underline" }}>Equipment</h1>
      <button onClick={openNewEquipModal}>Add New Equipment</button>
      <Modal

        isOpen={newEquipModalIsOpen}
        onAfterOpen={afterOpenNewEquipModal}
        onRequestClose={closeNewEquipModal}

        contentLabel="New Equpment Modal"
      >

        <button onClick={closeNewEquipModal}>close</button>
        <input type="text" value={modalNewEquipName} onChange={(e) => setModalNewEquipName(e.target.value)}></input>
        <button type="submit" onClick={submitNewEquipment}>Submit New Equipment</button>
      </Modal>
    </div>


    <Container fluid style={{ flexWrap: "wrap" }} >

      <Row style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
        {equipmentList.map((Equipment, index) => {
          return (
            <Col md="auto" key={Equipment.id ? Equipment.id : index}>


              <div key={Equipment.id} className="card" style={{ borderStyle: "double", borderRadius: "25px", width: "auto" }}>
                <Card className="card-body" style={{ margin: "auto auto auto 10%" }}>
                  <h2 className="card-title" style={{ fontSize: "24" }}> {Equipment.name}</h2>
                  <p className="card-text" style={{ margin: "2% 25% 2% 2%" }}>Equipment ID: {Equipment.id}</p>
                  <p style={{ fontWeight: "bold" }} > Bearing Size:  &nbsp;&nbsp;&nbsp; &nbsp; {Equipment.BearingSize}</p>
                  <p style={{ fontWeight: "bold" }}> Drive Belt Size: &nbsp;{Equipment.DriveBeltSize}</p>
                  <p style={{ fontWeight: "bold" }}> Gear Box Size:  &nbsp; {Equipment.GearBoxSize}</p>

                  <p style={{ fontWeight: "bold" }}> <Link to={{ pathname: `/ServiceDates/${Equipment.id}`, state: { id: Equipment.id } }}>Last Service Date: {Equipment.ServiceDates.items.length > 0 ? format(Equipment.ServiceDates.items[0].createdAt, "yyyy-MM-dd") : "no dates"} </Link></p>

                  <button key={Equipment.id} value={Equipment} style={{ backgroundColor: "#21702f", borderRadius: "5px" }} onClick={(e) => { setModalEquip(Equipment); openModal() }}>Add Service Date</button> <button onClick={() => { setUpdateModalEquipmentID(Equipment.id); setUpdateModalEquipmentName(Equipment.name); openUpdateModal() }}>Update Equipment</button><br />
                  <label for="notes" style={{ fontWeight: "bold", color: "#e35a0b" }}>Latest Notes</label> <br />
                  <textarea name="notes" rows="4" style={{ width: "90%", backgroundColor: "#92969c" }} value={Equipment.ServiceDates.items.length > 0 ? Equipment.ServiceDates.items[0].notes : "no notes"} readOnly={true}></textarea>

                  <Modal
                  

                    isOpen={updateModalIsOpen}
                    onAfterOpen={afterOpenUpdateModal}
                    onRequestClose={closeUpdateModal}

                    contentLabel="update Equip Modal"
                  >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                    <button onClick={closeUpdateModal}>close</button>
                    <h2>{updateModalEquipmentName}</h2>
                    <label>Bearing Size</label>
                    <input type="text" value={updateModalBearing} onChange={(e) => setUpdateModalBearing(e.target.value)}></input><br />
                    <label>Drive Belt Size</label>
                    <input type="text" value={updateModalDriveBelt} onChange={(e) => setUpdateModalDriveBelt(e.target.value)}></input> <br />
                    <label>Gear Box Size</label>
                    <input type="text" value={updateModalGearBox} onChange={(e) => setUpdateModalGearBox(e.target.value)}></input><br />
                    <label>Cupsize/ChainLink Size</label>
                    <input type="text" value={updateModalCupSize} onChange={(e) => setUpdateModalCupSize(e.target.value)}></input>
                    <button type="submit" onClick={handleUpdateEquipment}>Click to add Updates</button>
                  </Modal>




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

      </Row>
    </Container>

  </body >
)
      }
export default LocationPage;