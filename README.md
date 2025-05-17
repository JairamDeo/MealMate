📊 MongoDB Setup Guide for MealMate Project
This guide will walk you through setting up MongoDB for the MealMate project on Windows.
📋 Table of Contents
https://github.com/JairamDeo/MealMate
open this click on foodCategory.json click on it and from from right side donwload raw file in you system.
same for foodData2.json click on it and from from right side donwload raw file in you system.

Prerequisites
Windows Setup
MongoDB Atlas Setup
Importing Data
Connecting to Backend

🛠️ Prerequisites

📁 MealMate project files (Download from GitHub Repository https://github.com/JairamDeo/MealMate)
🌐 Internet connection
📝 MongoDB Atlas account (free tier is sufficient)

🪟 Windows Setup
1️⃣ Installing MongoDB Community Server
🔷 Download MongoDB Community Server

🌐 Go to MongoDB Community Server Download Page
✅ Select version 6.0 or above
⚡ OR directly download using this link: https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-6.0.23-signed.msi

🔷 Installation Process

🚀 Run the downloaded .msi file
👉 Follow the installation wizard
⚠️ Important: Add MongoDB bin path to environment variables

📂 Typically: C:\Program Files\MongoDB\Server\6.0\bin



2️⃣ Installing MongoDB Database Tools
🔷 Download MongoDB Database Tools

💾 Download the MongoDB Database Tools: mongodb-database-tools-windows-x86_64-100.12.0.msi

🔷 Installation Process

🚀 Run the downloaded .msi file
👉 Follow the installation wizard
⚠️ Important: Add the bin path to environment variables

📂 Typically: C:\Program Files\MongoDB\Tools\100\bin



3️⃣ Setup MongoDB Service

💻 Open Command Prompt as Administrator
🖥️ Run the command: mongod
❌ If you see an error, create these folders:

📁 Create folder C:\data
📁 Inside that, create folder C:\data\db


🔄 Run mongod again (keep this window open)

☁️ MongoDB Atlas Setup

🔐 Create MongoDB Atlas Account

🌐 Go to MongoDB Atlas Login Page
📝 Sign up or log in to your account


📋 Create a New Project

🆕 Click "New Project"
✏️ Enter project name (e.g., "MealMate")
▶️ Click "Next" and keep default settings
✅ Click "Create Project"
👥 You can add members if you have any


🏗️ Create a Cluster

➕ After creating project, you'll see option to "Create a Cluster" - click on it
🔍 You'll see option to deploy your cluster - select FREE option (third one)
⚙️ Inside configuration, enter cluster name (default is "Cluster0")
☁️ Select provider as AWS
🌏 It will select region by default (Mumbai ap-south-1) - keep as is
🚀 Click "Create Cluster" or "Create Deployment" button


🔒 Configure Security

🔄 When prompted with "Connect to Cluster0" form:
👤 Enter username as you want (e.g., "meal-mate")
🔑 Create a password (IMPORTANT: save these credentials somewhere as you'll need them later)
✅ Click "Create User" button
🔄 Then click on "Choose a Connection Method"
❌ Close this form using the X button
🔒 Go to "Network Access" from left side dashboard menu
➕ Click "Add IP Address"
🌐 Choose "Enter Your Current IP Address" or "Access From Anywhere" for testing (you can change this later)


📊 Create Database Collections

💾 Go to "Databases" in the left sidebar
🗂️ Click on "Clusters"
🔍 Click on "Cluster0" (or whatever name you gave)
📋 Go to "Collections"
⏳ It will take some time to load
⚠️ DO NOT click on "Load Sample Data" - select "Add My Own Data"
📝 Enter your database name (e.g., "MealMateDB") - this is your database name
📋 Enter collection name "sample" (no need to select additional preferences)
✅ Click "Create"



📤 Importing Data
Now we'll import the MealMate food items and categories from JSON files. This is why we installed the MongoDB tools earlier - we need to upload the complete schema for food items and food category from the JSON files in the GitHub repo.
1️⃣ Get Import Command Template

🔧 In MongoDB Atlas, click on "Cmd Line Tools"
📜 Scroll down to "Data Import and Export Tools"
📋 Copy the command inside mongoimport section, which looks like:

mongoimport --uri mongodb+srv://mealmate1:<PASSWORD>@cluster0.xzf9usp.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
2️⃣ Start MongoDB Daemon

💻 Open Command Prompt and type mongod and press Enter

🔄 This is a daemon process which runs in the background
❌ If you see something like "failed" or errors, go to C drive and:

📁 Create folder C:\Data
📁 Inside it create folder C:\Data\db
🔄 Run mongod command again - this time it should work


⚠️ Keep this running and minimize Command Prompt (don't close it!)



3️⃣ Prepare Import Commands

💻 Open another Command Prompt window
🔄 We need to modify the template command to import our two files: foodCategory.json and foodData2.json
✏️ Start with:

mongoimport --uri

📋 Then paste the copied command template:

mongodb+srv://mealmate1:<PASSWORD>@cluster0.xzf9usp.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --file <FILENAME>
📄 For the First File (foodData2.json):

🔄 Replace placeholders in the command:

📂 Replace <FILENAME> with the complete correct relative path to the file including extension:
--file "C:\Users\jaira\Desktop\MealMate\foodData2.json"

🔄 Instead of --type <FILETYPE> write:
--jsonArray

📋 Change <COLLECTION> for the first file to:
--collection food_items

💾 Enter your database name in place of <DATABASE>, e.g., "MealMateDB":
mongodb+srv://mealmate1:<PASSWORD>@cluster0.xzf9usp.mongodb.net/MealMateDB

🔑 Replace <PASSWORD> with the password you created earlier:
mongodb+srv://mealmate1:mealmate@cluster0.xzf9usp.mongodb.net/MealMateDB



📋 Your final command should look like this:

mongoimport --uri mongodb+srv://mealmate1:mealmate@cluster0.xzf9usp.mongodb.net/MealMateDB --collection food_items --jsonArray --file "C:\Users\jaira\Desktop\MealMate\foodData2.json"

✅ Check that all syntax in the command is correct
🔄 When you run this, you should see output like:

connected to: mongodb+srv://[**REDACTED**]@cluster0.xzf9usp.mongodb.net/MealMateDB
12 document(s) imported successfully. 0 document(s) failed to import.

🔍 You can check MongoDB Atlas inside Collections - "food_items" should be created with the imported data

📄 For the Second File (foodCategory.json):

🔄 Do the same process but change the collection name:

📋 For this file, collection name should be "foodCategory":
--collection foodCategory

⚠️ Make sure you change the collection name otherwise this file's data will go into your previous collection and you'll have to manually delete it


📋 Your final command for the second file should look like:

mongoimport --uri mongodb+srv://mealmate1:mealmate@cluster0.xzf9usp.mongodb.net/MealMateDB --collection foodCategory --jsonArray --file "C:\Users\jaira\Desktop\MealMate\foodCategory.json"

⚠️ Make sure:

📄 For file foodCategory.json → collection name is foodCategory
📄 For file foodData2.json → collection name is food_items
🚫 DON'T change collection names - enter them exactly as shown as we use these same names in the backend


🔄 When you run this, you should see output like:

2025-05-18T01:18:09.243+0530    3 document(s) imported successfully. 0 document(s) failed to import.

🔍 Check inside MongoDB Atlas collections - both collections should be created with their data
✅ You can close both Command Prompt windows now

🔌 Connecting to Backend
Now that you've set up the database, you need to connect it to the MealMate backend:

🌐 Open MongoDB Atlas
📋 Click on "Clusters" from the left side of dashboard
🔗 You'll see a "Connect" button beside your Cluster name - click on it
💻 Click on "Drivers" from "Connect to your application"
📋 Inside Driver select "Node.js"
📋 For Version, select "2.2.12 or later" (I have installed this in code - if you select another version, it may cause issues)
💻 Run the following command in your terminal (inside the backend folder root):

npm install mongodb@2.2.12

📋 Copy the URI connection string from Step 3 "Add your connection string into your application code":

mongodb://mealmate1:<db_password>@ac-u2ck0vw-shard-00-00.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-01.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-02.xzf9usp.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hfxgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

🔑 Enter your database password correctly (whatever you chose when setting up MongoDB Atlas)
📝 In your backend folder, open the .env file and add the connection string:

MONGO_URI=mongodb://mealmate1:<db_password>@ac-u2ck0vw-shard-00-00.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-01.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-02.xzf9usp.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hfxgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
(Replace <db_password> with your actual password)
🎉 Success!
Your database is set up successfully!
You can now start the backend server as instructed in the backend folder README.

📝 Note: This setup guide preserves all original instructions for Windows configuration. If you encounter any issues, please check the MongoDB documentation or the MealMate repository for additional help.
Connecting to Backend
Now that you've set up the database, you need to connect it to the MealMate backend:

Open MongoDB Atlas
Click on "Clusters" from the left side of dashboard
You'll see a "Connect" button beside your Cluster name - click on it
Click on "Drivers" from "Connect to your application"
Inside Driver select "Node.js"
For Version, select "2.2.12 or later" (I have installed this in code - if you select another version, it may cause issues)
Run the following command in your terminal (inside the backend folder root):

npm install mongodb@2.2.12

Copy the URI connection string from Step 3 "Add your connection string into your application code":

mongodb://mealmate1:<db_password>@ac-u2ck0vw-shard-00-00.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-01.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-02.xzf9usp.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hfxgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

Enter your database password correctly (whatever you chose when setting up MongoDB Atlas)
In your backend folder, open the .env file and add the connection string:

MONGO_URI=mongodb://mealmate1:<db_password>@ac-u2ck0vw-shard-00-00.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-01.xzf9usp.mongodb.net:27017,ac-u2ck0vw-shard-00-02.xzf9usp.mongodb.net:27017/?ssl=true&replicaSet=atlas-2hfxgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
(Replace <db_password> with your actual password)
🎉 Success!
Your database is set up successfully!
You can now start the backend server as instructed in the backend folder README.

📝 Note: This setup guide preserves all original instructions for Windows configuration. If you encounter any issues, please check the MongoDB documentation or the MealMate repository for additional help.