const docs = document.getElementById("doc");

const generate = document.getElementById("generate_btn");

// const arr = new Array();

function purifyDate(date) {

    const DMY = date.split("-");

    let refined_date = new Array();

    for (let i = 0; i < 3; i++) {

        elem = DMY.pop();

        refined_date.push(elem);

    }

    refined_date = refined_date.join('/');

    return refined_date.toString();
}


generate.addEventListener('click', (e) => {

    //Process the input from the form

    e.preventDefault();

    // Custom implementations

    const date = new Date();

    const Current_date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    //Form values

    const Random_number = parseInt(Math.random() * 1000);

    let Memo_no = document.getElementById("Memo_no").value;

    Memo_no = Memo_no != '' && Memo_no != 0 && Memo_no != NaN ? Memo_no : Random_number;

    let Truck_number = document.getElementById("Truck_number").value;

    Truck_number = Truck_number != '' && Truck_number != 0 ? Truck_number : '';

    let Custom_date = document.getElementById("Date").value;

    Custom_date = Custom_date != '' ? purifyDate(Custom_date) : Current_date;

    let Pickup_location = document.getElementById("Pickup_location").value;

    Pickup_location = Pickup_location != '' && Pickup_location != 0 ? Pickup_location : '';

    let Driver_name = document.getElementById("Driver_name").value;

    Driver_name = Driver_name != '' && Driver_name != 0 ? Driver_name : '';

    let Drop_location = document.getElementById("Drop_location").value;

    Drop_location = Drop_location != '' && Drop_location != 0 ? Drop_location : '';

    let Truck_owner_address = document.getElementById("Truck_owner_address").value;

    Truck_owner_address = Truck_owner_address != '' && Truck_owner_address != 0 ? Truck_owner_address : '';

    let Truck_owner_name = document.getElementById("Truck_owner_name").value;

    Truck_owner_name = Truck_owner_name != '' && Truck_owner_name != 0 ? Truck_owner_name : '';

    let Driver_number = document.getElementById("Driver_number").value;

    Driver_number = Driver_number != '' && Driver_number != 0 && Driver_number != NaN ? Driver_number : 0;

    let Driving_license_number = document.getElementById("Driving_license_number").value;

    Driving_license_number = Driving_license_number != '' && Driving_license_number != 0 ? Driving_license_number : '';

    let Consignor = document.getElementById("Consignor").value;

    Consignor = Consignor != '' && Consignor != 0 ? Consignor : '';

    let Consignee = document.getElementById("Consignee").value;

    Consignee = Consignee != '' && Consignee != 0 ? Consignee : '';

    let Particulars = document.getElementById("Particulars").value;

    Particulars = Particulars != '' && Particulars != 0 ? Particulars : '';

    let Weight = document.getElementById("Weight").value;

    Weight = Weight != '' && Weight != 0 ? Weight : '';

    let Total_collection = document.getElementById("Total_collection").value;

    Total_collection = Total_collection != '' && Total_collection != 0 && Total_collection != NaN ? Total_collection : 0;

    let Height_charge = document.getElementById("Height_charge").value;

    Height_charge = Height_charge != '' && Height_charge != 0 && Height_charge != NaN  ? Height_charge : 0;

    let Height_freight = document.getElementById("Height_freight").value;

    Height_freight = Height_freight != '' && Height_freight != 0 && Height_freight != NaN ? Height_freight : 0;
    
    let Workout = document.getElementById("Workout").value;
    
    Workout = Workout != '' && Workout != 0 && Workout != NaN ? Workout : 0;
    
    // Total of height charge, height freight and total collection
    
    let Calculated_collection = parseInt(Height_charge) + parseInt(Height_freight) + parseInt(Total_collection);

    let Advance = document.getElementById("Advance").value;

    Advance = Advance != '' && Advance != 0 && Advance != NaN ? Advance : 0;

    let Balance = parseInt(Fixed_rupees) - parseInt(Advance);

    Balance = Balance != '' && Balance != 0 && Balance != NaN ? Balance : 0;

    let Payment_location = document.getElementById('Payment_location').value;

    Payment_location = Payment_location != '' && Payment_location != 0 ? Payment_location : '';

    let Remarks = document.getElementById("Remarks").value;

    Remarks = Remarks != '' && Remarks != 0 ? Remarks : '';

    //Total all in grand total

    let Commission = document.getElementById("Commission").value;

    Commission = Commission != '' && Commission != 0 && Commission != NaN ? Commission : 0;

    let Tapal_amount = document.getElementById("Tapal_amount").value;

    Tapal_amount = Tapal_amount != '' && Tapal_amount != 0 && Tapal_amount != NaN ? Tapal_amount : 0;

    let Weight_wage = document.getElementById("Weight_wage").value;

    Weight_wage = Weight_wage != '' && Weight_wage != 0 && Weight_wage != NaN ? Weight_wage : 0;

    let Guide = document.getElementById("Guide").value;

    Guide = Guide != '' && Guide != 0 && Guide != NaN ? Guide : 0;

    let other_charges = document.getElementById("other_charges").value;

    other_charges = other_charges != '' && other_charges != 0 && other_charges != NaN ? other_charges : 0;

    //To here

    let Grand_total = parseInt(Commission) + parseInt(Tapal_amount) + parseInt(Weight_wage) + parseInt(Guide) + parseInt(other_charges);

    Grand_total = Grand_total != '' && Grand_total != 0 && Grand_total != NaN ? Grand_total : 0;

    //Total from here to Amount

    let Collection = document.getElementById("Collection").value;

    Collection = Collection != '' && Collection != 0 && Collection != NaN ? Collection : 0;

    let Actual_rupees = document.getElementById("Actual_rupees").value;

    Actual_rupees = Actual_rupees != '' && Actual_rupees != 0 && Actual_rupees != NaN ? Actual_rupees : 0;

    let Freight = document.getElementById("Freight").value;

    Freight = Freight != '' && Freight != 0 && Freight != NaN ? Freight : 0;

    let Difference = document.getElementById("Difference").value;

    Difference = Difference != '' && Difference != 0 && Difference != NaN ? Difference : 0;

    //To here

    let Amount_received = parseInt(Collection) + parseInt(Actual_rupees) + parseInt(Freight) + parseInt(Difference)

    Amount_received = Amount_received != '' && Amount_received != 0 && Amount_received != NaN ? Amount_received : 0;

    //Other instructions

    let Special_instruction = document.getElementById("Special_instruction").value;

    Special_instruction = Special_instruction != '' && Special_instruction != 0 ? Special_instruction : '';

    const reader = new FileReader();

    if (docs.files.length === 0) {
        alert("No files selected");
    }

    reader.readAsBinaryString(docs.files.item(0));

    reader.onerror = function (evt) {
        console.log("error reading file", evt);
        alert("error reading file" + evt);
    };

    reader.onload = function (evt) {
        const content = evt.target.result;
        const zip = new PizZip(content);
        const doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Render the document
        doc.render({
            Memo_number: Memo_no,
            Truck_number: Truck_number,
            Inserted_date: Custom_date,
            Pickup_location: Pickup_location,
            Driver_name: Driver_name,
            Drop_location: Drop_location,
            Owner_address: Truck_owner_address,
            Owner_name: Truck_owner_name,
            Driver_number: Driver_number,
            Driving_license_number: Driving_license_number,
            Consignor: Consignor,
            Consignee: Consignee,
            Particulars: Particulars,
            Weight: Weight,
            Total_collection: Total_collection,
            Height_charge: Height_charge,
            Height_freight: Height_freight,
            Workout: Workout,
            Calculated_collection: Calculated_collection, 
            Advance: Advance,
            Balance: Balance,
            Payment_location: Payment_location,
            Remarks: Remarks,
            Commission: Commission,
            Tapal: Tapal_amount,
            Weight_wage: Weight_wage,
            Guide_rupees: Guide,
            Other_expenses: other_charges,
            Grand_total: Grand_total,
            Collection: Collection,
            Actual_lorry: Actual_rupees,
            Freight: Freight,
            Difference: Difference,
            Amount: Amount_received,
            Special_instructions: Special_instruction
        });

        const blob = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });

        // arr.push(Memo_no,Truck_number,Custom_date,Driver_name,Driver_number,Pickup_location,Drop_location,Truck_owner_name,Truck_owner_number,Truck_owner_address,Transporter_name,Load_description,Load_weight,Load_height,Load_wage,Advance_wage,Commission_amount,Tapal_amount,Tds_advance,weight_wage,Guide,Unloading_charges,Party_refund,other_charges,Calculated_amount)

        // Output the document using Data-URI
        // Just changing the file name not the truck number
        Truck_number = Truck_number != '' && Truck_number != 0 ? Truck_number : "Generated";
        saveAs(blob, `${Truck_number}.docx`);
    };
});
