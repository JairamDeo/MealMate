# MealMate 🍽️

MealMate is a full-stack food delivery web application built using the **MERN stack** (MongoDB, Express, React, and Node.js). This app allows users to browse restaurants, place orders, and track their meals in real-time.

## 🚀 Live Demo
🔗 [MealMate - Live App](https://meal-mate-app-three.vercel.app/)

## 📂 Repository
🔗 [GitHub - MealMate](https://github.com/JairamDeo/MealMate)

---

## 📜 Features
✅ User authentication (Login/Register)
✅ Browse menu
✅ Add items to cart
✅ Place orders & track status
✅ Responsive design

## 🛠️ Tech Stack
- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), Render/Atlas (Backend & Database)

## 📦 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/JairamDeo/MealMate.git
   cd MealMate
   ```

2. **Install dependencies:**
   ```sh
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` folder and add:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     FRONTEND_URL=http://localhost:5173
     ```

     - Create a `.env` file in the `frontend` folder and add:
     ```env
     VITE_BACKEND_URL=http://localhost:5000
     ```

4. **Run the application:**
   ```sh
   # Start backend
   cd backend
   node .\index.js   or  nodemon

   # Start frontend
   cd frontend
   npm run dev
   ```

5. **Open the app in browser:**
   ```sh
   http://localhost: 5173
   ```
6. MongoDB setup
on your Mongodb setup upload two json file in your db collection foodCategory.json foodData2.json for food menu data price as it is. 

## 🚀 Deployment
- **Frontend:** Deployed on Vercel
- **Backend:**  hosted on Render

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📧 Contact
📩 **Jairam Deo** - [GitHub](https://github.com/JairamDeo)

---

⭐ **If you like this project, don't forget to give it a star!** ⭐
