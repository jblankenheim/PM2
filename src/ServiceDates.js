import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
//import { useLocation, Link } from "react-router-dom";
import { format } from 'date-fns';
import { generateClient } from 'aws-amplify/api';
import { serviceDatesByEquipmentID } from "./graphql/queries";
import { deleteServiceDate } from "./graphql/mutations";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Row } from "react-bootstrap";

const client = generateClient();

const ServiceDates = () => {
  const params = useParams();
  const equipmentid = params.id;

  console.log("the equipment id is " + equipmentid)
  const [serviceDates, setServiceDates] = useState([]);

  useEffect(() => {
    getServiceDates();
  }, []);

  async function getServiceDates() {
    try {
      const serviceData = await client.graphql({
        query: serviceDatesByEquipmentID,
        variables: {
          equipmentID: `${equipmentid}`
        }

      });

      var servDates = serviceData.data.serviceDatesByEquipmentID.items;

      setServiceDates(servDates)

    } catch (err) {
      console.log('error fetching serviceDates');
    }
  }
  ////////////////////////////////////////////////////
  /////setting state for the prompt

  /////////////////////////////////////////////////



  async function deleteDateCard(e) {    //////////

    console.log("the date to delete is" + `${e}`)
    const deleteDetails = {
      id: `${e}`
    };
    console.log("delete details are" + deleteDetails);
   

      try {
        const deletedDate = await client.graphql({
          query: deleteServiceDate,
          variables: { input: deleteDetails }

        })

        console.log("Deleted!!" + deletedDate)

      } catch (err) {
        console.log('error deleting date');
      }
      finally {
        getServiceDates();
       
      }
    }
      
  
  /////////////testing the Equipment variable Data//////////////////////////////


  //   console.log("The Service Date List is" + ServiceDateList)

  console.log("the service date list is " + serviceDates.length)
  console.log("The service date keys are " + serviceDates.keys());
  console.log("service dates looks like" + serviceDates);

  return (

    <body style={{ backgroundColor: "#2067b3" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "150%", textDecoration: "underline" }}>
        Service Dates
      </h1>



      <Container fluid style={{ flexWrap: "wrap" }} >
        <Row style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {serviceDates.map((Date, index) => {
            return (
              <Col md="auto" key={Date.createdAt ? Date.createdAt : index}>

                <div key={Date.createdAt} className="card" style={{ borderStyle: "double", borderRadius: "5%", width: "auto" }}>
                  <Card className="card-body" style={{ margin: "auto" }}>

                    <h2 className="card-title" style={{ fontSize: "22" }}>Date: {format(`${Date.createdAt}`, "yyyy-MM-dd")} </h2>

                    <p style={{ fontWeight: "bold" }} > Bearing :  &nbsp;&nbsp; &nbsp; {`${Date.CheckedBearings}`}</p>
                    <p style={{ fontWeight: "bold" }}> Drive Belt : &nbsp;{`${Date.CheckedBelt}`}</p>
                    <p style={{ fontWeight: "bold" }}> Greased :  &nbsp; &nbsp;&nbsp;{`${Date.Greased}`}</p>

                    <label style={{ fontWeight: "bold", color: "#e35a0b" }}> Notes</label> <br />
                    <textarea name="notes" rows="4" style={{ width: "90%", backgroundColor: "#92969c" }} value={Date.notes ? Date.notes : "---"} readOnly={true}></textarea>
                    <button value={Date.id} onClick={(e) => deleteDateCard(e.target.value)}>Delete Service Date</button>

                  </Card>
                </div>
              </Col>
            )
          }
          )
          }

        </Row>




      </Container>





    </body>
  )
}
export default ServiceDates;