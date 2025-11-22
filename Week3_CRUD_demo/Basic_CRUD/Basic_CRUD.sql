-- ============================================
-- CORE TABLES
-- ============================================

CREATE TABLE Category (
  Category_ID INT AUTO_INCREMENT,
  Category_Name VARCHAR(100) NOT NULL,
  Description VARCHAR(500),
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (Category_ID),
  UNIQUE (Category_Name)
);

CREATE TABLE Customer (
  Customer_ID INT AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  Phone VARCHAR(20),
  Email VARCHAR(100),
  Address VARCHAR(500),
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Customer_ID),
  UNIQUE (Email),
  CHECK (Email LIKE '%@%.%')
);

CREATE TABLE User (
  User_ID INT AUTO_INCREMENT,
  Username VARCHAR(50) NOT NULL,
  Password VARCHAR(255) NOT NULL, -- For hashed passwords
  Role ENUM('Admin', 'Manager', 'Cashier') NOT NULL DEFAULT 'Cashier',
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Last_Login TIMESTAMP NULL,
  Is_Active BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (User_ID),
  UNIQUE (Username)
);

CREATE TABLE Supplier (
  Supplier_ID INT AUTO_INCREMENT,
  Name VARCHAR(100) NOT NULL,
  Contact VARCHAR(100) NOT NULL,
  Phone VARCHAR(20),
  Email VARCHAR(100),
  Address VARCHAR(500) NOT NULL,
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Supplier_ID),
  UNIQUE (Name)
);

CREATE TABLE Products (
  Product_ID INT AUTO_INCREMENT,
  Product_Name VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Stock_Quantity DECIMAL(10,2) NOT NULL DEFAULT 0,
  Description VARCHAR(500),
  Category_ID INT NOT NULL,
  Min_Stock_Level DECIMAL(10,2) DEFAULT 10, -- For low stock alerts
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Product_ID),
  FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (Price >= 0),
  CHECK (Stock_Quantity >= 0)
);

-- ============================================
-- TRANSACTION TABLES
-- ============================================

CREATE TABLE Transaction (
  Transaction_ID INT AUTO_INCREMENT,
  Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Total_Amount DECIMAL(10,2) NOT NULL,
  Customer_ID INT,
  User_ID INT NOT NULL,
  Payment_Method ENUM('Cash', 'Credit Card', 'Debit Card', 'Transfer') DEFAULT 'Cash',
  Status ENUM('Completed', 'Pending', 'Cancelled') DEFAULT 'Completed',
  Notes VARCHAR(500),
  PRIMARY KEY (Transaction_ID),
  FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID) 
    ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (Total_Amount >= 0)
);

CREATE TABLE Transaction_Detail (
  Detail_ID INT AUTO_INCREMENT,
  Transaction_ID INT NOT NULL,
  Product_ID INT NOT NULL,
  Quantity DECIMAL(10,2) NOT NULL,
  Unit_Price DECIMAL(10,2) NOT NULL,
  Subtotal DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (Detail_ID),
  FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (Transaction_ID) REFERENCES Transaction(Transaction_ID) 
    ON DELETE CASCADE ON UPDATE CASCADE,
  CHECK (Quantity > 0),
  CHECK (Unit_Price >= 0),
  CHECK (Subtotal >= 0)
);

CREATE TABLE Purchase (
  Purchase_ID INT AUTO_INCREMENT,
  Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Total_Cost DECIMAL(10,2) NOT NULL,
  Supplier_ID INT NOT NULL,
  User_ID INT NOT NULL,
  Status ENUM('Completed', 'Pending', 'Cancelled') DEFAULT 'Pending',
  Notes VARCHAR(500),
  PRIMARY KEY (Purchase_ID),
  FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (User_ID) REFERENCES User(User_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (Total_Cost >= 0)
);

CREATE TABLE Purchase_Detail (
  Detail_ID INT AUTO_INCREMENT,
  Purchase_ID INT NOT NULL,
  Product_ID INT NOT NULL,
  Quantity DECIMAL(10,2) NOT NULL,
  Unit_Cost DECIMAL(10,2) NOT NULL,
  SubTotal DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (Detail_ID),
  FOREIGN KEY (Purchase_ID) REFERENCES Purchase(Purchase_ID) 
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (Product_ID) REFERENCES Products(Product_ID) 
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CHECK (Quantity > 0),
  CHECK (Unit_Cost >= 0),
  CHECK (SubTotal >= 0)
);

-- ============================================
-- USEFUL INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_product_category ON Products(Category_ID);
CREATE INDEX idx_transaction_date ON Transaction(Date);
CREATE INDEX idx_transaction_user ON Transaction(User_ID);
CREATE INDEX idx_purchase_date ON Purchase(Date);
CREATE INDEX idx_purchase_supplier ON Purchase(Supplier_ID);
CREATE INDEX idx_product_name ON Products(Product_Name);

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Categories
INSERT INTO Category (Category_Name, Description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Food & Beverage', 'Food and drink products'),
('Office Supplies', 'Stationery and office equipment'),
('Home & Garden', 'Home improvement and gardening items');

-- Users (Password: 'admin123' hashed with bcrypt)
INSERT INTO User (Username, Password, Role) VALUES
('admin', '$2b$10$rQ5xVJZ9V5CqXYZ9V5CqXe', 'Admin'),
('manager1', '$2b$10$rQ5xVJZ9V5CqXYZ9V5CqXe', 'Manager'),
('cashier1', '$2b$10$rQ5xVJZ9V5CqXYZ9V5CqXe', 'Cashier');

-- Suppliers
INSERT INTO Supplier (Name, Contact, Phone, Email, Address) VALUES
('Tech Wholesale Ltd', 'John Smith', '+62-21-1234567', 'john@techwholesale.com', 'Jakarta Business District, Jakarta'),
('Fashion Hub Inc', 'Sarah Johnson', '+62-21-7654321', 'sarah@fashionhub.com', 'Surabaya Trade Center, Surabaya'),
('Food Distributors', 'Mike Chen', '+62-274-111222', 'mike@fooddist.com', 'Malioboro Street, Yogyakarta');

-- Customers
INSERT INTO Customer (Name, Phone, Email, Address) VALUES
('Ahmad Hidayat', '+62-812-3456789', 'ahmad@email.com', 'Jl. Kaliurang No. 123, Yogyakarta'),
('Siti Nurhaliza', '+62-813-9876543', 'siti@email.com', 'Jl. Malioboro No. 45, Yogyakarta'),
('Budi Santoso', '+62-815-5555555', 'budi@email.com', 'Jl. Solo No. 78, Yogyakarta');

-- Products
INSERT INTO Products (Product_Name, Price, Stock_Quantity, Description, Category_ID, Min_Stock_Level) VALUES
('Laptop ASUS ROG', 15000000.00, 10, '15.6" Gaming Laptop with RTX 3060', 1, 5),
('Samsung Galaxy S23', 12000000.00, 25, 'Flagship smartphone with 256GB storage', 1, 10),
('Office Chair Ergonomic', 1500000.00, 50, 'Comfortable office chair with lumbar support', 4, 10),
('T-Shirt Cotton Premium', 150000.00, 100, 'High-quality cotton t-shirt', 2, 20),
('Instant Noodles Pack', 15000.00, 500, 'Pack of 5 instant noodles', 3, 100);

-- ============================================
-- USEFUL VIEWS FOR REPORTING
-- ============================================

-- Low Stock Products View
CREATE VIEW Low_Stock_Products AS
SELECT 
  p.Product_ID,
  p.Product_Name,
  p.Stock_Quantity,
  p.Min_Stock_Level,
  c.Category_Name
FROM Products p
JOIN Category c ON p.Category_ID = c.Category_ID
WHERE p.Stock_Quantity <= p.Min_Stock_Level;

-- Sales Summary View
CREATE VIEW Sales_Summary AS
SELECT 
  DATE(t.Date) AS Sale_Date,
  COUNT(DISTINCT t.Transaction_ID) AS Total_Transactions,
  SUM(t.Total_Amount) AS Total_Revenue,
  AVG(t.Total_Amount) AS Average_Transaction_Value
FROM Transaction t
WHERE t.Status = 'Completed'
GROUP BY DATE(t.Date);

-- Product Sales Report View
CREATE VIEW Product_Sales_Report AS
SELECT 
  p.Product_ID,
  p.Product_Name,
  c.Category_Name,
  SUM(td.Quantity) AS Total_Quantity_Sold,
  SUM(td.Subtotal) AS Total_Revenue,
  COUNT(DISTINCT td.Transaction_ID) AS Number_Of_Transactions
FROM Products p
JOIN Category c ON p.Category_ID = c.Category_ID
LEFT JOIN Transaction_Detail td ON p.Product_ID = td.Product_ID
LEFT JOIN Transaction t ON td.Transaction_ID = t.Transaction_ID AND t.Status = 'Completed'
GROUP BY p.Product_ID, p.Product_Name, c.Category_Name;