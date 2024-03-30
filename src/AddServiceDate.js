
import { createServiceDate } from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

const client = generateClient();


const AddServiceDate = ({ Equipment}) => {
/////////testing equipment variable passed from location
    console.log("equipment id is " + Equipment.id)
    console.log("equipment name is " + Equipment.name)
    /////////////////Setting state variables
    const [checkedBelt, setCheckedBelt] = useState("false");
    const [checkedBearings, setCheckedBearings] = useState("false");
    const [notes, setNotes] = useState("");
    const [greased, setGreased] = useState("false");
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
    const navigate = useNavigate();

    console.log("The Date is set at" + date)
    ////////////////////////////////////////////////////////////
    //creating too many functions for updating state because i'm too lazy to figure out how to map the input boxes to a generic function to update state

    function updateBelt() {
        setCheckedBelt(!checkedBelt);
    };
    function updateBearings() {
        setCheckedBearings(!checkedBearings);
    }
    function updateGreased() {
        setGreased(!greased);
    };

   

/////creating query parameters
    const serviceDateDetails = {
        //     ServiceDate: `${date}`,
        Greased: `${greased}`,
        CheckedBelt: `${checkedBelt}`,
        CheckedBearings: `${checkedBearings}`,
        equipmentID: `${Equipment.id}`,
        notes: `${notes}`
    };

    async function handleSubmitServiceDate() {
        try {
             await client.graphql({
                query: createServiceDate,
                variables: { input: serviceDateDetails }
            }
            );
            //query graphql using imported query for facility data.  used appsync to edit quer

            console.log("Success!");

            //    console.log(response.JSON)
            //testing in console


            //setting equipment function by mining equipment data.  data was indexed at items and needs to be separated and pushed into an array


        } catch (err) {
            console.log('error setting service date');
            console.log(Equipment.id)
        }

        finally {
            
////////navigating out of modal 
           navigate(0);

        }


    }



    return (
        <div>
            <h1>{Equipment.name}</h1>
            <label>Date</label>
            <input type="date" placeholder="yyyy-MM-DD" onChange={(e) => setDate(e.target.value)}></input> <br />
            <label>Checked Belt?</label>
            <input type="checkbox" defaultValue="false" onChange={updateBelt} /> <br />
            <label>Checked Bearings?</label>
            <input type="checkbox"  defaultValue="false" onChange={updateBearings} /> <br />
            <label>Equipment Was Greased?</label>
            <input type="checkbox"  defaultValue="false" onChange={updateGreased} /><br />
            <label style={{ fontWeight: "bold", fontSize: "20", backgroundColor: "grey" }}>Notes</label>
            <textarea style={{ display: "flex", width: "60%", inlineSize: "50%", textAlign: "left", verticalAlign: "top", overflowWrap: "break-word", height: "300px" }} type="text" width="80%" height="60%" value={notes} onChange={(e) => setNotes(e.target.value)} />
            <button type="submit" onClick={handleSubmitServiceDate}>submit Service Date</button>
        </div>


    )
}
export default AddServiceDate;