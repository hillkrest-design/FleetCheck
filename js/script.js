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
