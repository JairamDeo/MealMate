
# 🍽️ MealMate MongoDB Setup Guide (Windows)

This guide will walk you through setting up MongoDB for the MealMate project on **Windows**.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Windows Setup](#-windows-setup)
- [MongoDB Atlas Setup](#️-mongodb-atlas-setup)
- [Importing Data](#-importing-data)
- [Connecting to Backend](#-connecting-to-backend)

---

## 🛠️ Prerequisites

- 📁 MealMate project files: [GitHub Repository](https://github.com/JairamDeo/MealMate)
- 🌐 Internet connection
- 📝 MongoDB Atlas account (free tier is enough)

---

## 🪟 Windows Setup

### 1️⃣ Install MongoDB Community Server

- 🔗 [Download MongoDB Server v6.0+](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.23-signed.msi)
- 💿 Install the MSI and **add bin path** to Environment Variables:  
  `C:\Program Files\MongoDB\Server\6.0\bin`

### 2️⃣ Install MongoDB Database Tools

- 🔗 [Download Tools](https://www.mongodb.com/try/download/database-tools)
- 💿 Add to Environment Variables:  
  `C:\Program Files\MongoDB\Tools\100\bin`

### 3️⃣ Start MongoDB Service

- 🧑‍💻 Open CMD as Administrator  
- Type: `mongod`  
  ❌ If error: Create folders:
  ```
  C:\data
  C:\data\db
  ```
- Run `mongod` again (keep open)

---

## ☁️ MongoDB Atlas Setup

### 🔐 Create MongoDB Atlas Account

- 🔗 [Sign Up/Login](https://account.mongodb.com/account/login)

### 📋 Create a New Project

- Name: `MealMate`, then "Create Project"

### 🏗️ Create Cluster

- Select **FREE tier**
- Default Region (Mumbai `ap-south-1`)
- Name: `Cluster0` (or custom)

### 🔒 Configure Security

- Username: `mealmate1`
- Password: `mealmate`
- ✅ Save credentials
- Allow IP: `Access from Anywhere`

### 📊 Create Database & Collections

- Database name: `MealMateDB`
- Collection name: `sample` (temp)

---

## 📤 Importing Data

### 🔽 Download JSON Files

- From [MealMate Repo](https://github.com/JairamDeo/MealMate):
  - [foodCategory.json](https://github.com/JairamDeo/MealMate/blob/main/foodCategory.json) → Download raw
  - [foodData2.json](https://github.com/JairamDeo/MealMate/blob/main/foodData2.json) → Download raw

### ⚙️ Get Import Command

- On MongoDB Atlas → Cluster → "Command Line Tools" → Copy `mongoimport` template

### 💻 Example Import Commands:

**Import foodData2.json**
```bash
mongoimport --uri mongodb+srv://mealmate1:mealmate@cluster0.xzf9usp.mongodb.net/MealMateDB --collection food_items --jsonArray --file "C:\Users\jaira\Desktop\MealMate\foodData2.json"
```

**Import foodCategory.json**
```bash
mongoimport --uri mongodb+srv://mealmate1:mealmate@cluster0.xzf9usp.mongodb.net/MealMateDB --collection foodCategory --jsonArray --file "C:\Users\jaira\Desktop\MealMate\foodCategory.json"
```

✅ Collections `food_items` and `foodCategory` should appear with data in Atlas.

---

## 🔌 Connecting to Backend

1. In MongoDB Atlas, go to:
   - Cluster → **Connect** → **Drivers**
   - Choose Driver: **Node.js**
   - Version: **2.2.12 or later**

2. Install driver in backend:
```bash
npm install mongodb@2.2.12
```

3. Add Mongo URI to `.env` in backend:

```env
MONGO_URI=mongodb://mealmate1:<db_password>@ac-u2ck0vw-shard-00-00.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-01.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-02.xzf9usp.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hfxgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
```
🔑 Replace `<db_password>` with your real password.

---

🎉 **Success!** MongoDB is now connected to the MealMate project.