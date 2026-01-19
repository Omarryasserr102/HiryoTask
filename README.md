# Social Feed App

A native mobile application built with **React Native (Expo)** and **TypeScript**. This application allows users to view a social feed of posts and navigate to post details to read comments, fetching real-time data from the GoRest API.

## 📋 Features

* [cite_start]**Home Screen:** Fetches and displays a list of user posts with titles and summaries[cite: 5, 30].
* [cite_start]**Post Details:** Navigates to a detailed view showing the full post content[cite: 36, 37].
* [cite_start]**Comments System:** Automatically fetches and lists comments associated with the specific post below the content[cite: 20, 37].
* **Navigation:** Uses React Navigation for smooth transitions between the Feed and Details screens.
* [cite_start]**TypeScript:** Fully typed codebase for better maintainability and error checking[cite: 60].

## 🛠 Tech Stack

* [cite_start]**Framework:** React Native (Expo Go) [cite: 52]
* [cite_start]**Language:** TypeScript [cite: 60]
* **Navigation:** @react-navigation/native-stack

## 🚀 How to Run the App

This project uses **Expo Go**, making it easy to run on both iOS and Android without complex native setups.

### Prerequisites
* **Node.js** installed on your machine.
* **Expo Go** app installed on your physical device (available on App Store & Google Play).

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_GITHUB_REPO_URL_HERE>
    cd SocialApp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on Device:**
    * Scan the QR code displayed in the terminal using the **Expo Go** app (Android) or the Camera app (iOS).

## ⏱ Time Taken

**Total Time:** Approx. [cite_start]5 hours Because its my first time using all of this or implementing mobile app 


## 📸 Screenshots

made file called screenshots that includes the pictures 

### 📂 Project Structure

```text
SocialApp/
├── assets/                 # Images and icons
├── screens/                # Screen components
│   ├── HomeScreen.tsx      # Logic for fetching and displaying the post list
│   └── PostDetails.tsx     # Logic for displaying single post and comments
├── App.tsx                 # Main entry point & Navigation configuration
├── tsconfig.json           # TypeScript configuration
└── package.json 
└──ScreenShots



# HiryoTask
