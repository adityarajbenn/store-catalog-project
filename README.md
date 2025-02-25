# 🏪 Store Catalog Project

This is a **Store Catalog Management System** where users can:
- View all products across multiple stores.
- Filter by store, category, and price range.
- Search products with real-time filtering.
- Compare prices of products from different stores.
- Manage stores and products via an admin panel.

---

## **🚀 Live Demo**
- **Backend API:** [store-catalog-project.onrender.com](https://store-catalog-project.onrender.com)
- **Frontend UI:** [store-catalog.netlify.app](https://store-catalog.netlify.app)


---

## **🛠 Tech Stack**
### **Backend**
- Node.js + Express.js
- MongoDB (Atlas)
- Mongoose ORM
- Render (Deployment)

### **Frontend**
- React.js (CRA)
- Material-UI (MUI)
- Axios (API Requests)
- Netlify (Deployment)

---

# **🔧 Setup Instructions**
## **1️⃣ Clone the Repository**

```sh
git clone https://github.com/adityarajbenn/store-catalog-project.git
cd store-catalog-project

2️⃣ Backend Setup

cd backend
npm install   # Install dependencies
🔹 Set up .env file
Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
🔹 Run the Backend

npm start
The server will start at: http://localhost:5000

3️⃣ Frontend Setup

cd ../frontend-admin
npm install   # Install dependencies
🔹 Set up .env file
Create a .env file inside frontend-admin/:

REACT_APP_BACKEND_URL=https://store-catalog-project.onrender.com
🔹 Run the Frontend: npm start
The frontend will start at: http://localhost:3000

🚀 Deployment Guide

🟢 Backend Deployment (Render)
Go to Render.
Click "New Web Service" → Select GitHub repo.
Set Root Directory to /backend
Build Command: cd backend && npm install
Start Command: cd backend && node server.js
Click Deploy.

🟢 Frontend Deployment (Netlify)
Method 1: Deploy from GitHub
Go to Netlify.
Click "New Site from Git" → Connect GitHub repo.
Set Publish Directory: frontend-admin/build
Click Deploy.
Method 2: Manual Upload
Run: npm run build
Upload the frontend-admin/build folder to Netlify.
📬 API Endpoints

✅ Products API
Method	Endpoint	Description
GET	/products	Get all products
GET	/products/:storeId	Get products by store
GET	/products/search/:query	Search products
GET	/products/filter	Filter products
GET	/compare/:itemName	Compare product prices
POST	/products	Add a new product


✅ Stores API
Method	Endpoint	Description
GET	/stores	Get all stores
POST	/stores	Add a new store
🙌 Contributors
Aditya Raj Benn (GitHub)
Open to contributions!
📜 License
This project is open-source under the MIT License.

🔥 Enjoy using the Store Catalog System!

### 📌 How to Add to Your Repo
1. **Open your terminal and navigate to your project folder:**
   ```sh
   cd store-catalog-project
Create a new README.md file:

nano README.md
Paste the content above, then save and exit.
Commit and push to GitHub:

git add README.md
git commit -m "Added project README"
git push origin main