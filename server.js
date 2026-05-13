const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let sensorInfo = { count: 0, time: "N/A" };
let isD2On = false;
let shouldReset = false; // ESP32 কে রিসেট সিগন্যাল দেওয়ার জন্য

// ১. রিসেট এন্ডপয়েন্ট (সঠিক লজিক)
app.post('/api/reset-count', (req, res) => {
    sensorInfo.count = 0;
    shouldReset = true; // এই ফ্ল্যাগটি ESP32 কে রিসেট করতে বলবে
    console.log("রিসেট রিকোয়েস্ট সফল! ESP32 সিগন্যালের অপেক্ষায়...");
    res.json({ success: true });
});

// ২. ESP32 এর জন্য চেক এন্ডপয়েন্ট (LED + Reset Signal)
app.get('/api/check-led-d2', (req, res) => {
    // ফরম্যাট: LED_STATUS|RESET_SIGNAL (যেমন: ON|1 অথবা OFF|0)
    let resetSignal = shouldReset ? "1" : "0";
    res.send(`${isD2On ? "ON" : "OFF"}|${resetSignal}`);
    
    // একবার সিগন্যাল পাঠানো হলে সেটি আবার ০ করে দিন
    if(shouldReset) {
        shouldReset = false;
        console.log("রিসেট সিগন্যাল ESP32 কে পাঠানো হয়েছে।");
    }
});

// ৩. D2 LED কন্ট্রোল এন্ডপয়েন্ট (Frontend থেকে আসে)
app.post('/api/toggle-d2', (req, res) => {
    isD2On = req.body.status;
    console.log("D2 LED স্ট্যাটাস:", isD2On ? "ON" : "OFF");
    res.json({ success: true });
});

// ৪. সেন্সর ডাটা রিসিভ (ESP32 থেকে আসে)
app.post('/api/sensor-data', (req, res) => {
    sensorInfo.count = req.body.count;
    sensorInfo.time = new Date().toLocaleTimeString();
    console.log("নতুন কাউন্ট:", sensorInfo.count);
    res.send("OK");
});

// ৫. ফ্রন্টেন্ডের জন্য ডাটা পাঠানো
app.get('/api/get-sensor-data', (req, res) => {
    res.json(sensorInfo);
});

app.listen(3000, () => console.log('Server running on port 3000'));