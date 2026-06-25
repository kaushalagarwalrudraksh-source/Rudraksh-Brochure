# Manufacturing Inventory Manager

A comprehensive web-based inventory management system designed for manufacturing units to manage raw materials, finished goods, production formulas, and purchase orders.

## Features

### 📊 Dashboard
- Real-time overview of inventory status
- Statistics cards showing:
  - Total raw materials in inventory
  - Total finished goods in stock
  - Active production formulas
  - Pending purchase orders
- Low stock alerts with visual indicators
- Recent production history

### 📦 Raw Materials Management
- Add and manage raw materials with details like:
  - Material name and unit (kg, liters, pieces, etc.)
  - Current quantity in stock
  - Reorder/restock level
  - Cost per unit
  - Supplier information
- View all materials in a comprehensive table
- Edit or delete existing materials
- Automatic low stock notifications

### 🎁 Finished Goods Management
- Track finished products with:
  - Product name and SKU
  - Unit type for measurement
  - Current stock level
  - Minimum stock level
  - Selling price per unit
- Complete inventory visibility
- Stock status indicators

### ⚙️ Manufacturing Formulas
- Create production formulas with:
  - Formula name and unique identifier
  - Select finished product
  - Define output quantity per batch
  - Add multiple raw materials with exact ratios
- Visual formula display showing all ingredients
- Edit or delete formulas
- Ingredient-based ratio management

### 🏭 Production Log
- Record production batches with:
  - Formula selection
  - Number of batches to produce
  - Production date
  - Additional notes
- Automatic material consumption calculation
- Finished goods quantity update
- Production history tracking
- Ability to reverse/delete production records

### 📋 Purchase Orders
- Create purchase orders for raw materials:
  - Select material and quantity needed
  - Set unit cost and total cost calculation
  - Add supplier information
  - Set expected delivery date
  - Add order notes
- Track order status (Pending, Confirmed, Delivered)
- Mark orders as confirmed or received
- Automatic stock update when orders are received
- Order management and deletion

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The application uses browser local storage, so your data persists between sessions

### Adding Raw Materials
1. Click the "Raw Materials" option in the sidebar
2. Click "+ Add Raw Material" button
3. Fill in material details:
   - Material name
   - Unit of measurement
   - Initial quantity
   - Reorder level (quantity at which to reorder)
   - Cost per unit
   - Supplier name
4. Click "Save Material"

### Creating Finished Goods
1. Go to "Finished Goods" section
2. Click "+ Add Finished Good"
3. Enter product details:
   - Product name
   - Unit of measurement
   - Initial stock quantity
   - Minimum stock level
   - Selling price
   - SKU (optional)
4. Click "Save Product"

### Setting Up Manufacturing Formulas
1. Navigate to "Formulas" section
2. Click "+ Create Formula"
3. Enter formula details:
   - Formula name
   - Select the finished product this formula produces
   - Enter output quantity per batch
4. Click "+ Add Raw Material" to add ingredients
5. Select each raw material and enter the quantity required
6. Click "Save Formula"

**Example Formula:**
```
Formula: Standard Paint - 100 Liters
Product: Premium Paint
Output per Batch: 100 liters
Raw Materials:
- Base Paint: 80 liters
- Color Pigment A: 15 liters
- Color Pigment B: 5 liters
```

### Recording Production
1. Go to "Production Log"
2. Click "+ Record Production"
3. Select a formula from the dropdown
4. Enter number of batches
5. Set production date
6. The system automatically calculates:
   - Total output quantity
   - Raw materials required
   - Available inventory vs. required
7. Click "Record Production"

**What happens when production is recorded:**
- Raw materials are automatically deducted from inventory
- Finished goods quantity is increased
- Production is logged with timestamp

### Creating Purchase Orders
1. Navigate to "Purchase Orders"
2. Click "+ Create Purchase Order"
3. Fill in order details:
   - Select raw material
   - Enter quantity needed
   - Set unit cost
   - Enter supplier name
   - Set expected delivery date (optional)
   - Add notes
4. Click "Create PO"

### Managing Purchase Orders
- **Mark as Confirmed**: Update order status
- **Mark as Received**: When stock arrives, automatically updates raw material inventory
- **Delete**: Remove the purchase order

### Viewing Reports
The dashboard provides quick insights:
- **Low Stock Alerts**: Shows materials and products below reorder/minimum levels
- **Recent Productions**: Last 5 production records
- **Statistics**: Overview of all inventory categories

## Data Storage

All data is stored in your browser's **Local Storage**. This means:
- ✅ Data persists even after closing the browser
- ✅ No internet connection needed
- ✅ No server setup required
- ⚠️ Data is stored locally on each device (not synced across devices)

### Backup Your Data
To backup your data:
1. Open browser DevTools (F12 or right-click → Inspect)
2. Go to Application → Local Storage
3. Find the entry with key "manufacturingData"
4. Copy the JSON data and save to a file

## Inventory Management Best Practices

### Setting Reorder Levels
- Calculate average usage per period
- Add buffer stock for safety
- Example: If you use 100 units/week, set reorder level to 200 units

### Production Planning
- Always check available materials before recording production
- Keep minimum stock levels above regular usage
- Monitor low stock alerts regularly

### Supplier Management
- Keep supplier contact information up to date
- Track order lead times
- Maintain multiple suppliers for critical materials

## Tips for Effective Usage

1. **Consistent Units**: Use same units across all formulas (e.g., always kg for weight)
2. **Regular Updates**: Immediately record production and received orders
3. **Formula Documentation**: Use clear, descriptive formula names
4. **Supplier Info**: Maintain accurate supplier details for quick ordering
5. **Minimum Stock**: Set realistic minimum levels based on production schedule

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with Local Storage support

## Troubleshooting

### Data Not Saving?
- Check if Local Storage is enabled in browser settings
- Ensure you're not in private/incognito mode
- Try a different browser

### Can't Create Production?
- Verify sufficient raw materials are available
- Check formula has all ingredients defined
- Ensure raw material quantities are positive

### Formulas Not Appearing?
- Confirm at least one finished good product exists
- Ensure raw materials are added to the formula
- Try refreshing the page

## Future Enhancements

Potential features for future versions:
- Cloud sync and multi-device support
- Detailed analytics and reports
- Batch tracking and quality control
- Supplier performance metrics
- Barcode scanning
- Mobile app version
- Export to Excel/PDF
- User authentication and roles

## Support

For issues or suggestions, please check the code or review the application workflow.

---

**Version**: 1.0  
**Last Updated**: 2024  
**License**: MIT
