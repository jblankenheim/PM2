
import { createServiceDate } from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

const client = generateClient();


const AddServiceDate = ({Equipment}) => {

    /////////////////Setting state variables
    const [checkedBelt, setCheckedBelt] = useState(false);
    const [checkedBearings, setCheckedBearings] = useState(false);
    const [notes, setNotes] = useState("");
    const [greased, setGreased]=useState(false);
    const [date, setDate] = useState(null);

    console.log("The Date is set at" + date)
////////////////////////////////////////////////////////////
//creating too many functions for updating state because i'm too lazy to figure out how to map the input boxes to a generic function to update state

function updateBelt(){
    setCheckedBelt(!checkedBelt);
};
function updateBearings(){
    setCheckedBearings(!checkedBearings);
}
function updateGreased(){
    setGreased(!greased);
}



    const serviceDateDetails = {
               //     Greased: `${greased}`,
              //      CheckedBelt: `${checkedBelt}`,
               //     CheckedBearings: `${checkedBearings}`,
               equipmentID: `${Equipment.id}`
               //    notes: `${notes}`
    };

    async function handleSubmitServiceDate() {
        try {
            await client.graphql({
                query:  createServiceDate,
                variables: { input: serviceDateDetails}
            });
            //query graphql using imported query for facility data.  used appsync to edit quer

            console.log("Success!")
              
            //    console.log(response.JSON)
            //testing in console
           

            //setting equipment function by mining equipment data.  data was indexed at items and needs to be separated and pushed into an array


        } catch (err) {
            console.log('error setting service date');
            console.log(Equipment.id)
        }

        
    }
    return (
        <div>
            <h1>{Equipment.name}</h1>
            <label>Date</label>
            <input type="date" placeholder="yyyy-MM-DD" onChange={(e)=>setDate(e.target.value)}></input> <br/>
            <label>Checked Belt?</label>
            <input type="checkbox" defaultChecked="false" value = "beltChecked"  onChange={updateBelt}/> <br />
            <label>Checked Bearings?</label>
            <input type="checkbox" defaultChecked="false" value = "bearingsChecked" onChange={updateBearings}/> <br />
            <label>Equipment Was Greased?</label>
            <input type="checkbox" defaultChecked="false" value = "greaseChecked" onChange={updateGreased}/><br/>
            <label style={{fontWeight: "bold", fontSize: "20", backgroundColor: "grey"}}>Notes</label>
            <textarea style={{display: "flex", width: "60%", inlineSize: "50%", textAlign: "left", verticalAlign: "top", overflowWrap: "break-word", height: "300px"}} type ="text"  width="80%" height = "60%" value={notes} onChange={(e)=>setNotes(e.target.value)}/>
            <button type="submit" onClick={handleSubmitServiceDate}>submit Service Date</button>
        </div>


    )
}
export default AddServiceDate;