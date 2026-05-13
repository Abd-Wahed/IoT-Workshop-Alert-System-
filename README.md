# IoT Security & Monitoring System

**SafeZone Pro** is a high-performance, full-stack IoT solution designed for real-time security monitoring and remote hardware control. By integrating an **ESP32** microcontroller with a **Node.js** backend and a modern **Web Dashboard**, this system provides a seamless bridge between physical security and digital monitoring.

##  Key Features
*   **Precision Object Detection:** Uses an IR sensor with edge-detection logic to ensure accurate counting without duplicates.
*   **D2 LED Remote Toggle:** Directly control the ESP32's onboard (GPIO 2) LED from the web dashboard.
*   **Dual-Layer Counter Reset:** Remotely clear the detection history on both the server and the hardware memory simultaneously.
*   **Intelligent Feedback:** Immediate localized alerts using a Red/Green LED system and an active buzzer.
*   **Professional Monitoring UI:** A sleek, responsive dashboard built with a Glassmorphism theme and real-time data sync.

##  Hardware Configuration
The system uses specific GPIO pins on the ESP32 to manage sensors and actuators.

| Component | Pin (ESP32) | Function |
| :--- | :--- | :--- |
| **IR Sensor (OUT)** | GPIO 13 | Detects incoming objects/obstacles |
| **Red LED** | GPIO 14 | Alerts on object detection |
| **Green LED** | GPIO 27 | Indicates safe/clear status |
| **Active Buzzer** | GPIO 26 | Audible alert during detection |
| **Status LED** | GPIO 2 | Remote-controlled status light |
| **Power/Ground** | 3V3 / GND | System power supply |

## Software Architecture
The project is built using a modern 3-tier architecture:
1.  **Firmware (ESP32):** Written in C++/Arduino, handles sensor logic and HTTP communication.
2.  **Backend (Node.js):** An Express server that acts as the data hub and manages API endpoints.
3.  **Frontend (Web UI):** A JavaScript-powered dashboard that fetches and displays live telemetry.

##  Setup & Installation

### 1. Backend Setup
1.  Navigate to the project directory.
2.  Install dependencies:
    ```bash
    npm install express cors
    ```
3.  Run the server:
    ```bash
    node server.js
