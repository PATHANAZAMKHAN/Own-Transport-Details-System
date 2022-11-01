const docs = document.getElementById("doc");

const generate = document.getElementById("generate_btn") || HTMLButtonElement;

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

    let Custom_date = document.getElementById("Date").value;

    Custom_date = Custom_date != '' ? purifyDate(Custom_date) : Current_date;

    let Sir_name = document.getElementById("Sir-name").value;

    Sir_name = Sir_name != '' && Sir_name != 0 ? Sir_name : '';

    let Party_name = document.getElementById("Party-name").value;

    Party_name = Party_name != '' && Party_name != 0 ? Party_name : '';

    let Truck_number = document.getElementById("Truck-number").value;

    Truck_number = Truck_number != '' && Truck_number != 0 ? Truck_number : '';

    let Pickup_location = document.getElementById("Pickup-location").value;

    Pickup_location = Pickup_location != '' && Pickup_location != 0 ? Pickup_location : '';

    let Drop_location = document.getElementById("Drop-location").value;

    Drop_location = Drop_location != '' && Drop_location != 0 ? Drop_location : '';

    let Fixed_rate = document.getElementById("Fixed-rate").value;

    Fixed_rate = Fixed_rate != '' && Fixed_rate != 0 && Fixed_rate != NaN ? Fixed_rate : 0;

    let Advance_wage = document.getElementById("Advance-wage").value;

    Advance_wage = Advance_wage != '' && Advance_wage != 0 && Advance_wage != NaN ? Advance_wage : 0;

    let Load = document.getElementById("Load").value;

    Load = Load != '' && Load != 0 ? Load : '';

    let Payment_location = document.getElementById("Payment-location").value;

    Payment_location = Payment_location != '' && Payment_location != 0 ? Payment_location : '';

    let Remark = document.getElementById("Remark").value;

    Remark = Remark != '' && Remark != 0 ? Remark : '';

    let Unloading_point = document.getElementById('Unloading_point').value;

    Unloading_point = Unloading_point != '' && Unloading_point != 0 ? Unloading_point : '';


    var reader = new FileReader();
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
        var zip = new PizZip(content);
        var doc = new window.docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
        doc.render({
            Date: Custom_date,
            Sir_name: Sir_name,
            Party_name: Party_name,
            Truck_number: Truck_number,
            Drop_location: Drop_location,
            Pickup_location: Pickup_location,
            Fixed_rate: Fixed_rate,
            Advance_wage: Advance_wage,
            Load: Load,
            Payment_location: Payment_location,
            Remark: Remark,
            Unloading_point: Unloading_point
        });

        var blob = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            // compression: DEFLATE adds a compression step.
            // For a 50MB output document, expect 500ms additional CPU time
            compression: "DEFLATE",
        });
        // Output the document using Data-URI
        saveAs(blob, `${Truck_number}.docx`);
    };

});
