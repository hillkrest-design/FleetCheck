// ==========================================
// FleetCheck - Sprint 1
// JavaScript
// ==========================================

// Login Form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "" || password === "") {
            alert("Please enter your email and password.");
            return;
        }

        // Save demo user
        localStorage.setItem("fleetcheckUser", email);

        // Go to dashboard
        window.location.href = "dashboard.html";
    });
}

// Dashboard Welcome Message
window.addEventListener("load", function () {

    const welcome = document.getElementById("welcomeUser");

    if (welcome) {

        const user =
            localStorage.getItem("fleetcheckUser") ||
            "FleetCheck User";

        welcome.innerHTML =
            "Welcome, " + user + "!";
    }

});

// Logout
function logout() {

    localStorage.removeItem("fleetcheckUser");

    window.location.href = "index.html";

}

// Add Vehicle Button
function addVehicle() {

    const make = prompt("Vehicle Make:");

    if (make == null || make === "")
        return;

    const model = prompt("Vehicle Model:");

    if (model == null || model === "")
        return;

    const year = prompt("Vehicle Year:");

    if (year == null || year === "")
        return;

    const table = document.getElementById("vehicleTable");

    if (!table)
        return;

    const row = table.insertRow();

    row.insertCell(0).innerHTML = year;
    row.insertCell(1).innerHTML = make;
    row.insertCell(2).innerHTML = model;
    row.insertCell(3).innerHTML = "Good";

}

// Demo Inspection Counter
function inspectionsCompleted() {

    let count =
        Number(localStorage.getItem("inspectionCount")) || 0;

    count++;

    localStorage.setItem("inspectionCount", count);

    const display =
        document.getElementById("inspectionCount");

    if (display)
        display.innerHTML = count;

}

// Load inspection count
window.addEventListener("load", function () {

    const display =
        document.getElementById("inspectionCount");

    if (display) {

        display.innerHTML =
            Number(localStorage.getItem("inspectionCount")) || 0;

    }

});





// ===========================
// Vehicle Management
// ===========================

let vehicles =
JSON.parse(localStorage.getItem("vehicles")) || [];

const vehicleForm =
document.getElementById("vehicleForm");

if(vehicleForm){

displayVehicles();

vehicleForm.addEventListener("submit",function(e){

e.preventDefault();

const vehicle={

year:document.getElementById("year").value,

make:document.getElementById("make").value,

model:document.getElementById("model").value,

vin:document.getElementById("vin").value,

mileage:document.getElementById("mileage").value

};

vehicles.push(vehicle);

localStorage.setItem(
"vehicles",
JSON.stringify(vehicles)
);

displayVehicles();

vehicleForm.reset();

});

}

function displayVehicles(){

const tbody=
document.querySelector("#vehicleTable tbody");

if(!tbody) return;

tbody.innerHTML="";

vehicles.forEach((vehicle,index)=>{

let row=tbody.insertRow();

row.insertCell(0).innerHTML=vehicle.year;
row.insertCell(1).innerHTML=vehicle.make;
row.insertCell(2).innerHTML=vehicle.model;
row.insertCell(3).innerHTML=vehicle.vin;
row.insertCell(4).innerHTML=vehicle.mileage;

let action=row.insertCell(5);

action.innerHTML=
`<button onclick="deleteVehicle(${index})">
Delete
</button>`;

});

}

function deleteVehicle(index){

vehicles.splice(index,1);

localStorage.setItem(
"vehicles",
JSON.stringify(vehicles)
);

displayVehicles();

}


// ==========================================
// FleetCheck - Inspection Management
// Sprint 3
// ==========================================

let inspections =
    JSON.parse(localStorage.getItem("inspections")) || [];


// ------------------------------------------
// Load Vehicles Into Inspection Dropdown
// ------------------------------------------

function loadInspectionVehicles() {

    const vehicleSelect =
        document.getElementById("inspectionVehicle");

    if (!vehicleSelect) {
        return;
    }

    const vehicles =
        JSON.parse(localStorage.getItem("vehicles")) || [];

    vehicleSelect.innerHTML =
        '<option value="">Select a vehicle</option>';

    vehicles.forEach(function(vehicle, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            vehicle.year + " " +
            vehicle.make + " " +
            vehicle.model;

        vehicleSelect.appendChild(option);

    });

}


// ------------------------------------------
// Display Inspection History
// ------------------------------------------

function displayInspections() {

    const tableBody =
        document.querySelector("#inspectionTable tbody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (inspections.length === 0) {

        const row =
            tableBody.insertRow();

        const cell =
            row.insertCell(0);

        cell.colSpan = 5;

        cell.innerHTML =
            "No inspections have been recorded yet.";

        return;
    }

    inspections.forEach(function(inspection) {

        const row =
            tableBody.insertRow();

        row.insertCell(0).textContent =
            inspection.date;

        row.insertCell(1).textContent =
            inspection.vehicle;

        row.insertCell(2).textContent =
            inspection.type;

        row.insertCell(3).textContent =
            inspection.status;

        row.insertCell(4).textContent =
            inspection.notes || "None";

    });

}


// ------------------------------------------
// Inspection Form
// ------------------------------------------

const inspectionForm =
    document.getElementById("inspectionForm");


if (inspectionForm) {

    loadInspectionVehicles();

    displayInspections();


    inspectionForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const vehicleSelect =
                document.getElementById(
                    "inspectionVehicle"
                );

            const vehicleIndex =
                vehicleSelect.value;


            if (vehicleIndex === "") {

                alert(
                    "Please select a vehicle."
                );

                return;

            }


            const vehicles =
                JSON.parse(
                    localStorage.getItem("vehicles")
                ) || [];


            const vehicle =
                vehicles[vehicleIndex];


            if (!vehicle) {

                alert(
                    "The selected vehicle could not be found."
                );

                return;

            }


            const inspectionType =
                document.getElementById(
                    "inspectionType"
                ).value;


            const inspectionStatus =
                document.getElementById(
                    "inspectionStatus"
                ).value;


            const notes =
                document.getElementById(
                    "inspectionNotes"
                ).value.trim();


            if (
                inspectionType === "" ||
                inspectionStatus === ""
            ) {

                alert(
                    "Please complete the inspection type and status."
                );

                return;

            }


            // Get checklist results

            const checklist =
                document.querySelectorAll(
                    'input[name="inspection"]'
                );


            const checkedItems = [];


            checklist.forEach(function(item) {

                if (item.checked) {

                    checkedItems.push(
                        item.value
                    );

                }

            });


            const inspection = {

                date:
                    new Date().toLocaleDateString(),

                vehicle:
                    vehicle.year + " " +
                    vehicle.make + " " +
                    vehicle.model,

                type:
                    inspectionType,

                status:
                    inspectionStatus,

                checklist:
                    checkedItems,

                notes:
                    notes

            };


            inspections.push(inspection);


            localStorage.setItem(
                "inspections",
                JSON.stringify(inspections)
            );


            alert(
                "Inspection saved successfully."
            );


            inspectionForm.reset();

            displayInspections();

        }
    );

}
