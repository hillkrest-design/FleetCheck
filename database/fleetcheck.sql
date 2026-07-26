-- ==========================================
-- FleetCheck Database
-- Sprint 1
-- ==========================================

CREATE DATABASE IF NOT EXISTS FleetCheck;

USE FleetCheck;

-- ===========================
-- Users
-- ===========================

CREATE TABLE Users (

    UserID INT AUTO_INCREMENT PRIMARY KEY,

    FirstName VARCHAR(50),

    LastName VARCHAR(50),

    Email VARCHAR(100) UNIQUE,

    Password VARCHAR(255),

    Role VARCHAR(30)

);

-- ===========================
-- Vehicles
-- ===========================

CREATE TABLE Vehicles (

    VehicleID INT AUTO_INCREMENT PRIMARY KEY,

    Year INT,

    Make VARCHAR(50),

    Model VARCHAR(50),

    VIN VARCHAR(50),

    LicensePlate VARCHAR(20),

    CurrentMileage INT,

    Status VARCHAR(30)

);

-- ===========================
-- Inspections
-- ===========================

CREATE TABLE Inspections (

    InspectionID INT AUTO_INCREMENT PRIMARY KEY,

    VehicleID INT,

    UserID INT,

    InspectionDate DATE,

    InspectionType VARCHAR(50),

    OverallStatus VARCHAR(50),

    Notes TEXT,

    FOREIGN KEY (VehicleID)
        REFERENCES Vehicles(VehicleID),

    FOREIGN KEY (UserID)
        REFERENCES Users(UserID)

);

-- ===========================
-- Maintenance
-- ===========================

CREATE TABLE MaintenanceRecords (

    MaintenanceID INT AUTO_INCREMENT PRIMARY KEY,

    VehicleID INT,

    ServiceType VARCHAR(100),

    ServiceDate DATE,

    Mileage INT,

    Cost DECIMAL(10,2),

    Notes TEXT,

    FOREIGN KEY (VehicleID)
        REFERENCES Vehicles(VehicleID)

);

-- ==================================
-- Sample Data
-- ==================================

INSERT INTO Users
(FirstName, LastName, Email, Password, Role)

VALUES

('Austin','Brown','admin@fleetcheck.com','password','Manager'),

('John','Smith','driver@fleetcheck.com','password','Driver');



INSERT INTO Vehicles

(Year, Make, Model, VIN, LicensePlate, CurrentMileage, Status)

VALUES

(2023,'Freightliner','Cascadia','1ABC123456789','TRK101',55300,'Good'),

(2021,'Chevrolet','Silverado','2XYZ987654321','FLT220',41350,'Needs Service'),

(2019,'Ford','F-150','3LMN456789123','TRK310',81210,'Good');



INSERT INTO MaintenanceRecords

(VehicleID, ServiceType, ServiceDate, Mileage, Cost, Notes)

VALUES

(1,'Oil Change','2026-07-15',55000,129.99,'Routine maintenance'),

(2,'Brake Inspection','2026-06-10',41000,249.99,'Front brake pads replaced');



INSERT INTO Inspections

(VehicleID, UserID, InspectionDate, InspectionType, OverallStatus, Notes)

VALUES

(1,1,'2026-07-20','Pre-Trip','Passed','No issues found'),

(2,2,'2026-07-21','Post-Trip','Needs Attention','Brake warning light observed');
