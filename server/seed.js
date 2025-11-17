// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Product from "./models/Product.js"; // adjust path if needed

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected for Seeding"))
//   .catch(err => console.error(err));

// const products = [
//   {
//     name: "Arduino Uno",
//     category: "Microcontrollers",
//     price: 999,
//     image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
//     description: "Popular microcontroller board for prototyping and electronics projects."
//   },
//   {
//     name: "ESP32 Development Board",
//     category: "Microcontrollers",
//     price: 1250,
//     image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/ESP32.jpg",
//     description: "Wi-Fi + Bluetooth microcontroller board."
//   },
//   {
//     name: "DHT11 Temperature & Humidity Sensor",
//     category: "Sensors",
//     price: 120,
//     image: "https://upload.wikimedia.org/wikipedia/commons/8/86/DHT11.JPG",
//     description: "Temperature and humidity sensor with digital output."
//   },
//   {
//     name: "HC-SR04 Ultrasonic Sensor",
//     category: "Sensors",
//     price: 150,
//     image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Hc-sr04-ultrasonic-sensor.jpg",
//     description: "Ultrasonic sensor for distance measurement."
//   },
//   {
//     name: "Breadboard 830 Points",
//     category: "Prototyping & Accessories",
//     price: 100,
//     image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Breadboard.jpg",
//     description: "830 tie-points breadboard for prototyping."
//   }
// ];

// const seedDB = async () => {
//   await Product.deleteMany({});
//   await Product.insertMany(products);
//   console.log("🌱 Products seeded successfully!");
//   mongoose.connection.close();
// };

// seedDB();













// seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // adjust path if needed, e.g. "../models/Product.js"

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const products = [
  {
    name: "Arduino Uno",
    category: "Microcontrollers",
    price: 999,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg",
    ],
    description:
      "Popular microcontroller board for prototyping and electronics projects.",
    stock: 50,
    specifications: "Microcontroller: ATmega328P, Operating Voltage: 5V, I/O Pins: 14",
    tags: ["arduino", "microcontroller", "uno"],
  },
  {
    name: "ESP32 Development Board",
    category: "Microcontrollers",
    price: 1250,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/d/dc/ESP32.jpg",
    ],
    description:
      "Wi-Fi + Bluetooth microcontroller board, dual-core, great for IoT projects.",
    stock: 40,
    specifications: "Wi-Fi: 802.11 b/g/n, Bluetooth: v4.2 BLE, GPIO Pins: 30",
    tags: ["esp32", "iot", "wifi", "bluetooth"],
  },
  {
    name: "DHT11 Temperature & Humidity Sensor",
    category: "Sensors",
    price: 120,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/8/86/DHT11.JPG",
    ],
    description:
      "Temperature and humidity sensor with digital output. Ideal for weather stations.",
    stock: 100,
    specifications: "Temperature Range: 0-50°C, Humidity: 20-90%, Voltage: 3-5V",
    tags: ["sensor", "temperature", "humidity"],
  },
  {
    name: "HC-SR04 Ultrasonic Sensor",
    category: "Sensors",
    price: 150,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/Hc-sr04-ultrasonic-sensor.jpg",
    ],
    description:
      "Ultrasonic distance measurement sensor for robotics and automation.",
    stock: 90,
    specifications: "Range: 2cm–400cm, Frequency: 40kHz, Voltage: 5V",
    tags: ["sensor", "distance", "ultrasonic"],
  },
  {
    name: "Breadboard 830 Points",
    category: "Prototyping & Accessories",
    price: 100,
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Breadboard.jpg",
    ],
    description:
      "830 tie-points breadboard for prototyping circuits without soldering.",
    stock: 200,
    specifications: "Size: 6.5 x 2.1 inches, Tie-points: 830, Color: White",
    tags: ["breadboard", "prototyping", "electronics"],
  },
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log("🗑️ Old products removed");
    await Product.insertMany(products);
    console.log("🌱 Products seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
