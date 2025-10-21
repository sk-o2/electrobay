import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch(err => console.error(err));

const products = [
  {
    name: "Arduino Uno",
    category: "Microcontrollers",
    price: 999,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
    description: "Popular microcontroller board for prototyping and electronics projects."
  },
  {
    name: "ESP32 Development Board",
    category: "Microcontrollers",
    price: 1250,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/ESP32.jpg",
    description: "Wi-Fi + Bluetooth microcontroller board."
  },
  {
    name: "DHT11 Temperature & Humidity Sensor",
    category: "Sensors",
    price: 120,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/86/DHT11.JPG",
    description: "Temperature and humidity sensor with digital output."
  },
  {
    name: "HC-SR04 Ultrasonic Sensor",
    category: "Sensors",
    price: 150,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Hc-sr04-ultrasonic-sensor.jpg",
    description: "Ultrasonic sensor for distance measurement."
  },
  {
    name: "Breadboard 830 Points",
    category: "Prototyping & Accessories",
    price: 100,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Breadboard.jpg",
    description: "830 tie-points breadboard for prototyping."
  }
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("🌱 Products seeded successfully!");
  mongoose.connection.close();
};

seedDB();
