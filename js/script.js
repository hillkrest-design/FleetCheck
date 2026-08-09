// ==========================================
// FleetCheck
// Main JavaScript File
// Sprint 3
// ==========================================


// ==========================================
// LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        if (email === "" || password === "") {

            alert("Please enter your email and password.");

            return;
        }

        localStorage.setItem(
            "fleetcheckUser",
            email
        );

        window.location.href =
            "dashboard.html";

    });

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "fleetcheckUser"
    );

    window.location.href =
        "index.html";

}


// ==========================================
// DASHBOARD
// ==========================================

function loadDashboard() {

    const welcome =
        document.getElementById("welcomeUser");

    if (welcome) {

        const user =
            localStorage.getItem(
                "fleetcheckUser"
            ) || "FleetCheck User";

        welcome.textContent =
            "Welcome, " + user + "!";

    }


    const inspectionCount =
        document.getElementById(
            "inspectionCount"
        );

    if (inspectionCount) {

        const inspections =
            JSON.parse(
                localStorage.getItem("inspections")
            ) || [];

        inspectionCount.textContent =
            inspections.length;

    }


    const vehicleCount =
        document.getElementById(
            "vehicleCount"
        );

    if (vehicleCount) {

        const vehicles =
            JSON.parse(
                localStorage.getItem("vehicles")
            ) || [];

        vehicleCount.textContent =
            vehicles.length;

    }

}


window.addEventListener(
    "load",
    loadDashboard
);


// ==========================================
// VEHICLE MANAGEMENT
// ==========================================

let vehicles =
    JSON.parse(
        localStorage.getItem("vehicles")
    ) || [];


// Display vehicles

function displayVehicles() {

    const tableBody =
        document.querySelector(
            "#vehicleTable tbody"
        );

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (vehicles.length === 0) {

        const row =
            tableBody.insertRow();

        const cell =
            row.insertCell(0);

        cell.colSpan = 6;

        cell.textContent =
            "No vehicles have been added yet.";

        return;
    }


    vehicles.forEach(
        function(vehicle, index) {

            const row =
                tableBody.insertRow();

            row.insertCell(0).textContent =
                vehicle.year;

            row.insertCell(1).textContent =
                vehicle.make;

            row.insertCell(2).textContent =
                vehicle.model;

            row.insertCell(3).textContent =
                vehicle.vin || "N/A";

            row.insertCell(4).textContent =
                vehicle.mileage || "N/A";


            const actionCell =
                row.insertCell(5);


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.textContent =
                "Delete";

            deleteButton.onclick =
                function() {

                    deleteVehicle(index);

                };


            actionCell.appendChild(
                deleteButton
            );

        }
    );

}


// Add vehicle form

const vehicleForm =
    document.getElementById(
        "vehicleForm"
    );


if (vehicleForm) {

    displayVehicles();


    vehicleForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const year =
                document.getElementById(
                    "year"
                ).value.trim();


            const make =
                document.getElementById(
                    "make"
                ).value.trim();


            const model =
                document.getElementById(
                    "model"
                ).value.trim();


            const vin =
                document.getElementById(
                    "vin"
                ).value.trim();


            const mileage =
                document.getElementById(
                    "mileage"
                ).value.trim();


            if (
                year === "" ||
                make === "" ||
                model === ""
            ) {

                alert(
                    "Please enter the year, make, and model."
                );

                return;

            }


            const vehicle = {

                year: year,

                make: make,

                model: model,

                vin: vin,

                mileage: mileage

            };


            vehicles.push(vehicle);


            localStorage.setItem(
                "vehicles",
                JSON.stringify(vehicles)
            );


            vehicleForm.reset();

            displayVehicles();


            alert(
                "Vehicle added successfully."
            );

        }
    );

}


// Delete vehicle

function deleteVehicle(index) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this vehicle?"
        );


    if (!confirmed) {
        return;
    }


    vehicles.splice(
        index,
        1
    );


    localStorage.setItem(
        "vehicles",
        JSON.stringify(vehicles)
    );


    displayVehicles();

}


// ==========================================
// INSPECTION MANAGEMENT
// ==========================================

let inspections =
    JSON.parse(
        localStorage.getItem("inspections")
    ) || [];


// Load vehicles into inspection dropdown

function loadInspectionVehicles() {

    const vehicleSelect =
        document.getElementById(
            "inspectionVehicle"
        );


    if (!vehicleSelect) {
        return;
    }


    const savedVehicles =
        JSON.parse(
            localStorage.getItem("vehicles")
        ) || [];


    vehicleSelect.innerHTML =
        '<option value="">Select a vehicle</option>';


    savedVehicles.forEach(
        function(vehicle, index) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                vehicle.year +
                " " +
                vehicle.make +
                " " +
                vehicle.model;


            vehicleSelect.appendChild(
                option
            );

        }
    );

}


// Display inspection history

function displayInspections() {

    const tableBody =
        document.querySelector(
            "#inspectionTable tbody"
        );


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


        cell.textContent =
            "No inspections have been recorded yet.";


        return;

    }


    inspections.forEach(
        function(inspection) {

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
                inspection.notes ||
                "None";

        }
    );

}


// Inspection form

const inspectionForm =
    document.getElementById(
        "inspectionForm"
    );


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


            const savedVehicles =
                JSON.parse(
                    localStorage.getItem("vehicles")
                ) || [];


            const vehicle =
                savedVehicles[
                    vehicleIndex
                ];


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
                    "Please complete the inspection type and overall status."
                );

                return;

            }


            // Collect individual checklist results

            const resultFields =
                document.querySelectorAll(
                    ".inspection-result"
                );


            const checklistResults = [];


            resultFields.forEach(
                function(field) {

                    checklistResults.push({

                        item:
                            field.dataset.item,

                        result:
                            field.value

                    });

                }
            );


            const inspection = {

                date:
                    new Date()
                        .toLocaleDateString(),

                vehicle:
                    vehicle.year +
                    " " +
                    vehicle.make +
                    " " +
                    vehicle.model,

                type:
                    inspectionType,

                status:
                    inspectionStatus,

                checklist:
                    checklistResults,

                notes:
                    notes

            };


            inspections.push(
                inspection
            );


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


// ==========================================
// INSPECTION COUNT
// ==========================================

function getInspectionCount() {

    const savedInspections =
        JSON.parse(
            localStorage.getItem("inspections")
        ) || [];


    return savedInspections.length;

}


// ==========================================
// INITIALIZE PAGES
// ==========================================

window.addEventListener(
    "load",
    function() {

        displayVehicles();

        loadInspectionVehicles();

        displayInspections();

        loadDashboard();

    }
);
