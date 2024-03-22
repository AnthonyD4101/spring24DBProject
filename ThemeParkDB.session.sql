-- @block
SELECT *
FROM account 

-- @block
SELECT *
FROM customer

-- @block
SELECT * 
FROM employee

-- @block
SELECT * 
FROM department

-- @block
SELECT * 
FROM attraction

-- @block
SELECT * 
FROM vendor

-- @block INSERT PRODUCT DUMMY DATA
INSERT INTO Vendor(NameOfVendor, VendorType, VendorStatus, DepName)
VALUES
    ('Dominoes', 'Food', 'Active', 'Vendor'),
    ('Five Guys', 'Food', 'Active', 'Vendor');

INSERT INTO Product(ItemID, NameOfItem, NameOfVendor, AcquisitionCost, SalePrice, Profit, Description, ProductStatus)
VALUES
    (1, 'Pizza', 'Dominoes', 5, 10, 5, 'Large slice of pepperoni pizza', 'Active'),
    (2, 'Burger', 'Five Guys', 5, 9, 4, 'All classic, American burger', 'Active');

-- @block
SELECT * 
FROM product

-- @block
DELETE FROM product

-- @block
SELECT * 
FROM sale

-- @block
SELECT * 
FROM attractionlog

-- @block
SELECT * 
FROM maintenance

-- @block
SELECT * 
FROM weatherlog



-- @block
DROP DATABASE IF EXISTS parkdb;
CREATE DATABASE parkDB;
USE parkDB;
DROP TABLE IF EXISTS Account;
CREATE TABLE Account (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    AccountType ENUM(
        'Customer',
        'Employee',
        'Maintenance',
        'Department Manager',
        'Park Manager',
        'Admin'
    ) NOT NULL,
    FirstName VARCHAR(30) NOT NULL,
    MiddleName VARCHAR(30),
    LastName VARCHAR(30) NOT NULL,
    PhoneNumber VARCHAR(14) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);
DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
    UserID INT PRIMARY KEY,
    FirstName VARCHAR(30) NOT NULL,
    LastName VARCHAR(30) NOT NULL,
    DateOfBirth DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Account(UserID) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Employee;
CREATE TABLE Employee (
    UserID INT PRIMARY KEY,
    FirstName VARCHAR(30) NOT NULL,
    LastName VARCHAR(30) NOT NULL,
    PhoneNumber VARCHAR(14) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Position ENUM(
        'Admin',
        'Park Manager',
        'Department Manager',
        'Maintenance',
        'Employee'
    ) NOT NULL,
    SupUserID INT,
    Salary DECIMAL(10, 2) NOT NULL,
    Street VARCHAR(50),
    City VARCHAR(50),
    State CHAR(2),
    ZipCode CHAR(5),
    Status ENUM('Active', 'Inactive', 'Retired'),
    DepName VARCHAR(255) NOT NULL,
    ScheduleType ENUM ('First Shift', 'Second Shift') Not NULL,
    FOREIGN KEY (UserID) REFERENCES Account(UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (SupUserID) REFERENCES Employee(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Department;
CREATE TABLE Department (
    DepName VARCHAR(255) PRIMARY KEY,
    HoursWorked INT NOT NULL,
    ManagerUserID INT,
    FOREIGN KEY (ManagerUserID) REFERENCES Employee(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Attraction;
CREATE TABLE Attraction (
    NameOfAttraction VARCHAR(100) PRIMARY KEY,
    StartOperatingHour TIME NOT NULL,
    EndOperatingHour TIME NOT NULL,
    AttractionType ENUM('Ride', 'Show') NOT NULL,
    HeightRequirementInches DECIMAL(4, 2) NOT NULL,
    WeightRequirementPounds DECIMAL(5, 2) NOT NULL,
    Capacity INT NOT NULL,
    AttractionStatus ENUM('Active', 'Out of Order', 'Inactive') NOT NULL,
    DepName VARCHAR(255) NOT NULL,
    FOREIGN KEY (DepName) REFERENCES Department(DepName) ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Vendor;
CREATE TABLE Vendor (
    NameOfVendor VARCHAR(100) PRIMARY KEY,
    VendorType ENUM('Food', 'Merchandise') NOT NULL,
    VendorStatus ENUM('Active', 'Out of Order', 'Inactive') NOT NULL,
    DepName VARCHAR(255) NOT NULL,
    FOREIGN KEY (DepName) REFERENCES Department(DepName) ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Product;
CREATE TABLE Product (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    NameOfItem VARCHAR(100) NOT NULL,
    NameOfVendor VARCHAR(100),
    AcquisitionCost DECIMAL(5, 2) NOT NULL,
    SalePrice DECIMAL(5, 2) NOT NULL,
    Profit DECIMAL(5, 2) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    ProductStatus ENUM('Active', 'Inactive') NOT NULL,
    FOREIGN KEY (NameOfVendor) REFERENCES Vendor(NameOfVendor) ON DELETE CASCADE ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Sale;
CREATE TABLE Sale (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    Type ENUM('GA', 'KI', 'DG', 'DK') NOT NULL,
    DateValid DATE NOT NULL,
    DateTimeSold DATETIME NOT NULL,
    Price DECIMAL(6, 2) NOT NULL,
    FoodItemID INT,
    MerchItemID INT,
    FOREIGN KEY (UserID) REFERENCES Account(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (FoodItemID) REFERENCES Product(ItemID) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (MerchItemID) REFERENCES Product(ItemID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS AttractionLog;
CREATE TABLE AttractionLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    NameOfAttraction VARCHAR(100),
    UserID INT,
    Date DATE NOT NULL,
    NumberOfOperations INT NOT NULL,
    FOREIGN KEY (NameOfAttraction) REFERENCES Attraction(NameOfAttraction) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (UserID) REFERENCES Account(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS Maintenance;
CREATE TABLE Maintenance (
    RequestID INT AUTO_INCREMENT,
    StateID INT,
    UserID INT,
    NameOfAttraction VARCHAR(100),
    DescriptionOfRequest VARCHAR(250) NOT NULL,
    Date DATE NOT NULL,
    MaintenanceStatus ENUM('Pending', 'Active', 'Completed') NOT NULL,
    DateCompleted DATE NOT NULL,
    Expense DECIMAL(11, 2),
    DepName VARCHAR(255),
    primary key (RequestID, StateID),
    FOREIGN KEY (UserID) REFERENCES Account(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (NameOfAttraction) REFERENCES Attraction(NameOfAttraction) ON DELETE
    SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (DepName) REFERENCES Department(DepName) ON DELETE
    SET NULL ON UPDATE CASCADE
);
DROP TABLE IF EXISTS WeatherLog;
CREATE TABLE WeatherLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    DateOfClosure DATE NOT NULL,
    WeatherType ENUM(
        'Rainy',
        'Tornado Alert',
        'Hurricane Alert',
        'Excessive Heat Watch',
        'Winter Storm',
        'Flooding',
        'Other'
    ) NOT NULL,
    Description VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Employee(UserID) ON DELETE
    SET NULL ON UPDATE CASCADE
);
ALTER TABLE Account
ADD CONSTRAINT chk_AccountType CHECK (
        AccountType IN (
            'Customer',
            'Employee',
            'Maintenance',
            'Department Manager',
            'Park Manager',
            'Admin'
        )
    );
ALTER TABLE Account
ADD CONSTRAINT chk_PasswordLength CHECK (LENGTH(Password) >= 8);
ALTER TABLE Account
ADD CONSTRAINT chk_EmailFormat CHECK(Email LIKE '%_@__%.__%');
ALTER TABLE Employee
ADD CONSTRAINT chk_Salary CHECK(Salary > 0);
ALTER TABLE Employee
ADD CONSTRAINT fk_DepartmentName FOREIGN KEY (DepName) REFERENCES Department(DepName) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE Department
ADD CONSTRAINT chk_HoursWorked CHECK (HoursWorked >= 0);
ALTER TABLE Attraction
ADD CONSTRAINT chk_CapacityPositive CHECK (Capacity > 0);
ALTER TABLE Attraction
ADD CONSTRAINT chk_HeightRequirementNonNegative CHECK (HeightRequirementInches >= 0);
ALTER TABLE Attraction
ADD CONSTRAINT chk_WeightRequirementNonNegative CHECK (WeightRequirementPounds >= 0);
ALTER TABLE Attraction
ADD CONSTRAINT chk_OperatingHoursConsistent CHECK (StartOperatingHour < EndOperatingHour);
ALTER TABLE Attraction
ADD CONSTRAINT chk_AttractionStatus CHECK (
        AttractionStatus IN ('Active', 'Out of Order', 'Inactive')
    );
ALTER TABLE Attraction
ADD CONSTRAINT chk_AttractionType CHECK (AttractionType IN ('Ride', 'Show'));
ALTER TABLE Sale
ADD CONSTRAINT chk_PricePositive CHECK (Price > 0);
ALTER TABLE AttractionLog
ADD CONSTRAINT chk_NumberOfOperationsPositive CHECK (NumberOfOperations > 0);
ALTER TABLE Maintenance
ADD CONSTRAINT chk_ExpenseValid CHECK (Expense >= 0);
ALTER TABLE Vendor
ADD CONSTRAINT chk_VendorStatus CHECK (
        VendorStatus IN ('Active', 'Out of Order', 'Inactive')
    );
ALTER TABLE Vendor
ADD CONSTRAINT chk_VendorType CHECK (VendorType IN ('Merchandise', 'Food'));
ALTER TABLE Product
ADD CONSTRAINT chk_AcquisitionCost CHECK (AcquisitionCost >= 0);
ALTER TABLE Product
ADD CONSTRAINT chk_SalePrice CHECK (SalePrice >= 0);
ALTER TABLE Product
ADD CONSTRAINT chk_Profit CHECK (Profit >= 0);
ALTER TABLE Product
ADD CONSTRAINT chk_ProductStatus CHECK (ProductStatus IN ('Active', 'Inactive'));