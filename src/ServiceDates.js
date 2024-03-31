import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { format, set } from 'date-fns';
import { generateClient } from 'aws-amplify/api';
import { serviceDatesByEquipmentID } from "./graphql/queries";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


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
        sort: {direction: "desc", field: "createdAt"},
        variables : {  equipmentID: `${equipmentid}`
      }
   
      });
    
      var servDates = serviceData.data.serviceDatesByEquipmentID.items;
      setServiceDates(servDates)
      console.log("servDates is" + servDates)

    } catch (err) {
      console.log('error fetching serviceDates');
    }
  }



  /////////////testing the Equipment variable Data//////////////////////////////


  //   console.log("The Service Date List is" + ServiceDateList)
  console.log("the service date list is " + serviceDates.length)

  return (
   
    <body style={{ backgroundColor: "#2067b3" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "150%", textDecoration: "underline" }}>
        Service Dates
      </h1>

   

     <Container fluid style={{ flexWrap: "wrap" }} >
        <row style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
          {serviceDates.map((Date, index) => {
            return (
              <Col md="auto" key={Date.id ? Date.id : index}>

                <div key={Date.id} className="card" style={{ borderStyle: "double", borderRadius: "25px", width: "auto" }}>
                  <Card className="card-body" style={{ margin: "auto auto auto 10%" }}>
                    <h2 className="card-title" style={{ fontSize: "24" }}> </h2>
                    <p className="card-text" style={{ margin: "2% 25% 2% 2%" }}>Date: {Date.ServiceDate}</p>
                    <p style={{ fontWeight: "bold" }} > Bearing :  &nbsp;&nbsp;&nbsp; &nbsp; {Date.CheckedBearings}</p>
                    <p style={{ fontWeight: "bold" }}> Drive Belt : &nbsp;{Date.CheckedBelt}</p>
                    <p style={{ fontWeight: "bold" }}> Greased :  &nbsp; {Date.Greased}</p>

                    <label  style={{ fontWeight: "bold", color: "#e35a0b" }}> Notes</label> <br />
                    <textarea name="notes" rows="4" style={{ width: "90%", backgroundColor: "#92969c" }} value={Date.notes? Date.notes: "---"} readOnly={true}></textarea>

                  </Card>
                </div>
              </Col>
            )
          }
          )
          }

        </row>




      </Container>





    </body> 
  )
}
export default ServiceDates;