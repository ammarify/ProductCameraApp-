# ProductCameraApp 📷🛍️

A React Native CLI app for **Android only** that displays a list of products, shows product details, and allows capturing photos using the device camera powered by [react-native-vision-camera].

---

## Features

- **Product List**: Displays a grid of products with images, titles, and prices.
- **Product Detail**: Shows detailed information of a selected product.
- **Camera Screen**: Opens the device camera to take photos using `react-native-vision-camera`.
- Handles camera and microphone permission requests.

---

## Setup Instructions (Android Only)

1. **Clone the repository**

```bash
git clone https://github.com/ammarify/ProductCameraApp-.git
cd ProductCameraApp-


### 2. Install dependencies

```bash
npm install
```
### 3. Install react-native-vision-camera
npm install react-native-vision-camera

###4. Configure Android permissions
Edit android/app/src/main/AndroidManifest.xml to add:
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />

### 5. Run on Android

```bash
npx react-native run-android
```

npx react-native run-ios
```

## 📁 Project Structure

```
.
├── App.js
├── screens
│   ├── ProductList.js
│   ├── ProductDetail.js
│   └── CameraScreen.js

```

---
Libraries Used
react-native-vision-camera — For high-performance camera features in React Native.

Notes
This project currently supports Android only.

Camera and microphone permissions are requested at runtime.

The camera screen allows users to take photos using device camera hardware.

Author
Ammar Zakir