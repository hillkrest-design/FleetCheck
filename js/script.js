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
