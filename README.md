# Eduparenting

## 📝 Project Description

Eduparenting is a web application designed to be a comprehensive digital assistant for parents, helping them actively participate in and track their children's educational journey. The core problem this project addresses is the challenge parents face in staying organized and engaged with their child's learning, often leading to missed opportunities for support and a lack of clear insight into their progress.

Our proposed solution is a centralized platform where parents can access educational resources, view a child's learning progress through an intuitive dashboard, and manage lessons and activities. The prototype provides a structured, easy-to-use interface that empowers parents to become more effective partners in their child's education.

---

## ✨ Features

* **User Authentication:** Secure signup, login, and logout functionality for parents.
* **Level Dashboard:** An interactive dashboard that displays a child's progress through various educational levels.
* **Lessons Section:** A dedicated area where parents can access and manage a curated list of lessons and educational content.
* **Progress Tracking:** Visual indicators and reports to show a child's mastery and areas for improvement.
* **Responsive Design:** The application is optimized for use on both desktop and mobile devices.

---

## 🛠️ Technology Stack

* **Frontend:** React, JavaScript, HTML, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** Firestore for real-time data storage
* **Authentication:** Firebase Authentication

---

## ⚙️ Setup Instructions

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

You must have the following software installed:

* **Node.js** (version 14 or higher)
* **npm** (Node Package Manager)
* **Git**

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YourGitHubUsername]/eduparenting.git
    ```

2.  **Navigate into the project directory:**
    ```bash
    cd eduparenting
    ```

3.  **Install dependencies:**
    This project has separate dependencies for the frontend (`client`) and backend (`server`). You'll need to run `npm install` in each directory.

    * **Install backend dependencies:**
        ```bash
        cd server
        npm install
        ```

    * **Install frontend dependencies:**
        ```bash
        cd client
        npm install
        ```

4.  **Environment Configuration:**
    This project uses environment variables to handle configuration. Create a `.env` file in the **root** of the project and add your Firebase configuration details.

    * Create a file named `.env`.
    * Add your Firebase configuration to it:
        ```env
        REACT_APP_FIREBASE_API_KEY=[Your_Firebase_API_Key]
        REACT_APP_FIREBASE_AUTH_DOMAIN=[Your_Firebase_Auth_Domain]
        REACT_APP_FIREBASE_PROJECT_ID=[Your_Firebase_Project_ID]
        REACT_APP_FIREBASE_STORAGE_BUCKET=[Your_Firebase_Storage_Bucket]
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[Your_Firebase_Messaging_Sender_ID]
        REACT_APP_FIREBASE_APP_ID=[Your_Firebase_App_ID]
        ```

5.  **Run the application:**
    Now you can start both the frontend and backend servers. Open two separate terminal windows.

    * **Start the backend server:**
        ```bash
        # In the server directory
        npm start
        ```

    * **Start the frontend development server:**
        ```bash
        # In the client directory
        npm start
        ```

The application should now be running on `http://localhost:3000`.

---

## 🌐 Deployed Solution

You can access the live version of the application at the following URL:

[Paste your public URL here]

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

---

## 📧 Contact

If you have any questions or feedback, feel free to reach out to me at:

* **Name:** [Your Name]
* **Email:** [Your Email Address]