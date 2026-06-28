# Amazon Clone (JavaScript)

A responsive Amazon-inspired e-commerce web application built using **HTML**, **CSS**, and **Vanilla JavaScript (ES6 Modules)**. This project replicates the core shopping experience, including product browsing, search, cart management, checkout, order history, and package tracking.

> **Note:** This project was built for learning modern JavaScript concepts, object-oriented programming, asynchronous programming, and DOM manipulation without using any frontend framework.

---

## 🚀 Features

### 🛍️ Product Catalog
- Display products in a responsive grid layout.
- Product ratings and pricing.
- Product quantity selection.
- Clothing products include Size Chart links.
- Appliance products include Instruction and Warranty links.

### 🔍 Smart Search
- Real-time search suggestions.
- Search using product names or keywords.
- URL-based search (`?search=value`) for shareable searches.
- Keyboard navigation support for suggestions.

### 🛒 Shopping Cart
- Add products to cart.
- Update product quantity.
- Delete items.
- Delivery option selection.
- Automatic price calculation.
- Cart quantity displayed in the header.

### 💳 Checkout
- Order summary.
- Shipping cost calculation.
- Tax calculation.
- Order placement through backend API.
- Skeleton loading while fetching data.

### 📦 Orders
- View previous orders.
- Buy products again.
- Total order history.
- Empty order state.

### 🚚 Order Tracking
- Package tracking page.
- Animated delivery progress bar.
- Delivery status:
  - Preparing
  - Shipped
  - Delivered
- Tracking unavailable page for invalid orders.

### ⚡ Skeleton Loading
- Products page
- Checkout page
- Orders page
- Tracking page

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Fetch API
- Async / Await
- Object-Oriented Programming (Classes & Inheritance)
- Local Storage
- Day.js
- REST API

---

## 📂 Project Structure
## 📂 Project Structure

A structured breakdown of the frontend codebase, data models, and utility modules:

```text
Amazon-clone/
│
├── 📁 backend/
│   ├── products.json               # Raw product catalog payload
|
├── 📁 data/                        # Application state and mock data layers
│   ├── cart-class.js               # OOP-based shopping cart state management
│   ├── deliveryOptions.js          # Shipping speeds, rules, and pricing data
│   ├── orders.js                   # Historic order data storage and methods
│   ├── products.js                 # Product class definitions and object mapping
│   └── products.json               # Raw product catalog payload
│
├── 📁 scripts/                     # Application logic and page controllers
│   ├── amazon.js                   # Main homepage interaction and product grid
│   ├── checkout.js                 # Central orchestration for the checkout view
│   ├── orders.js                   # Logic for rendering the order history page
│   ├── tracking.js                 # Order tracking page rendering and progress bars
│   ├── searchBar.js                # Global search query processing and filtering
│   │
│   ├── 📁 checkout/                # Modular checkout page components
│   │   ├── checkoutHeader.js       # Dynamic cart item count header navbar
│   │   ├── orderSummary.js         # Cart line items, quantities, and delete actions
│   │   └── paymentSummary.js       # Cost breakdown calculations (tax, shipping, total)
│   │
│   └── 📁 utils/                   # Shared independent helper functions
│       ├── formatDate.js           # Customer-facing date string formatters
│       ├── isWeekend.js            # Day checker for delivery speed exclusions
│       └── money.js                # Precision financial rounding (cents to dollars)
│
├── 📁 styles/                      # Component and global layout stylesheets
│   ├── 📁 pages/
│   |   ├── amazon.css
│   |   ├── orders.css
│   |   ├── tracking.css
|   |   └── 📁 checkout/  
│   ├── 📁 shared/
|       ├── amazon.css
|       └── general.css
|
├── 📁 images/                      # High-resolution product icons and UI assets
│
├── 📄 index.html                   # Homepage view (product catalog)
├── 📄 checkout.html                 # Shopping cart and payment view
├── 📄 orders.html                   # Customer purchase history view
└── 📄 tracking.html                 # Live package delivery tracking view
```



---

## 🧠 JavaScript Concepts Demonstrated

- ES6 Modules
- Classes
- Inheritance
- Polymorphism
- Encapsulation
- Async Programming
- Promise.all()
- Fetch API
- DOM Manipulation
- Event Delegation
- URLSearchParams
- Template Literals
- Arrow Functions
- Array Methods
  - map()
  - find()
  - filter()
  - some()
  - forEach()

---

## 📸 Pages

### Home
- Product listing
- Search
- Add to cart

### Checkout
- Review cart
- Change quantity
- Select delivery option
- Place order

### Orders
- View previous purchases
- Buy again
- Track package

### Tracking
- Live delivery progress
- Estimated delivery date

---

## 🌐 Backend API

### Products

https://supersimplebackend.dev/products

### Orders

https://supersimplebackend.dev/orders


## 📈 Future Improvements
- User authentication
- Wishlist
- Product filters
- Sorting
- Pagination
- Backend database
- Payment gateway integration
- Responsive mobile navigation
- Dark mode
- Product reviews
- Image lazy loading
- Debounced search
- Better error handling
- State management


## 💡 Learning Outcomes

### This project helped strengthen knowledge of:

- Modern JavaScript
- Object-Oriented Programming
- Modular architecture
- DOM manipulation
- Asynchronous programming
- API integration
- Responsive web development
- Code organization

## 👨‍💻 Author

### Shivang singh
B.Tech Computer Science Engineering Student

## 📄 License
This project is intended for educational purposes only.

Amazon is a trademark of Amazon.com, Inc. This project is a personal educational clone and is not affiliated with or endorsed by Amazon.

## ⭐ If you like this project
## 🙏 Final Thanks & Contributions

Thank you for exploring this project! Your interest and time are highly appreciated.
* **🤝 Contributions:** Pull requests are welcome. Let's make this clone even more robust together.
