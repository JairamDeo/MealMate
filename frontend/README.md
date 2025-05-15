# 🚀 Food Order Frontend (React)

This is the frontend of a Food Ordering Web Application built with **React**, **Tailwind CSS**, and **Bootstrap**. It interacts with the backend via REST APIs and offers a dynamic UI for browsing, searching, and ordering food items.

---

## 💻 Prerequisites

- **Node.js** (Version 22.x recommended)
- **npm** (comes with Node.js)

### 📦 Install Node.js

#### For Windows:
1. Download the latest **Node.js v22** from [nodejs.org](https://nodejs.org/).
2. Run the installer and follow the setup instructions.
3. Verify installation:
   ```bash
   node -v
   npm -v
   ```

#### For Linux (Debian/Ubuntu):
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

---

## 🚀 Project Setup

1. Clone the repository:

```bash
git clone https://github.com/JairamDeo/MealMate.git
cd MealMate/frontend
```

## 🔧 Environment Configuration

Before running the frontend app, create a `.env` file in the root directory and add the following line:

```
VITE_BACKEND_URL=http://localhost:5000
```

This URL should point to your backend server.
change the url accoridng to your backend server.

---

2. Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

3. 🐧 For Linux EC2 Server:

🏗 Install Apache2:

```bash
sudo apt update
sudo apt install apache2 -y
```

▶️ Start Apache2 service:
```bash
sudo systemctl start apache2
sudo systemctl enable apache2

```

4. 🏗 Build the React app:

```bash
npm run build
```

🐧 For Linux Deploy build output to Apache's web directory:
```bash
sudo cp -rf dist/* /var/www/html/
```

This will launch the React app on `http://localhost:5173` by default.

🌐 Now, you can access your React frontend on linux via :
```bash
http://your-ec2-public-ip
```


## 📸 Features

- 🎯 Search food items with real-time filtering
- 🧾 Add items to cart with quantity and size options
- 💡 Responsive carousel with food category banners
- 💬 Tailwind and Bootstrap powered UI for better performance

---

## 📬 Feedback

Feel free to raise an issue or contribute to improve the project. Enjoy building! 🛠️