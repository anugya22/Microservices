# 🔧 IoT Device Management Microservices

This project is a **microservices-based device management system** built using **NestJS**, **MongoDB**, **RabbitMQ**, and **JWT authentication**.

It includes:
- A **Device API** service (`device-api`)
- A **Device Processor** microservice (`device-processor`)
- Bulk CSV upload support via **RabbitMQ**
- Full **CRUD support** for IoT devices

# project structure :
device-api src/ # Handles API requests, auth, device CRUD
device-processor src/ # Consumes queue messages and updates MongoDB
device-processor.ts # Entry point for processor microservice (Consumption) 


## 🚀 Steps I Followed

### 1. Setup MongoDB
I created a database named `device_db` and a collection named `devices` using **MongoDB Compass**.


### 2. Created `device-api` microservice
Using NestJS, I set up the `device-api` service to:
- Register/login users with JWT
- Create, Read, Update, Delete devices
- Handle bulk uploads of device data using `.csv`

### 3. Created `device-processor` microservice
This microservice:
- Listens to RabbitMQ `device_updates` queue
- Receives and processes device data
- Stores or updates device records in MongoDB

It prints messages like:
Received device data: { name: 'Temperature Sensor', ... }


## 🔐 Authentication
I used JWT for protecting all endpoints.
Use it in headers:
-H "Authorization: Bearer <your_token>"


## 📦 CSV Upload
I added support to upload a CSV file to POST /devices/upload and sent each record to RabbitMQ.

Sample devices.csv:

deviceId,name,type,status
1,Temperature Sensor,Sensor,active
2,Humidity Sensor,Sensor,inactive
3,Pressure Monitor,Monitor,active

## CURL Commands Used
# Register a user
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "admin123"}'

## Login and Get JWT
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "admin", "password": "admin123"}'

## Create a device 
curl -X POST http://localhost:3000/devices \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Sensor A",
  "status": "active",
  "location": "Zone 1"
}'

## Update a Device
Changed The status of objectid : 6851ad37ef4b32bfb99b7a51 from active to inactive.

curl -X PUT http://localhost:3000/devices/6851ad37ef4b32bfb99b7a51 \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
  "name": "Temperature Sensor",
  "status": "inactive"
}'

## Delete a Device
curl -X DELETE http://localhost:3000/devices/6851ad37ef4b32bfb99b7a51 \
-H "Authorization: Bearer <your_token>"

## Upload CSV
curl -X POST http://localhost:3000/devices/upload \
-H "Authorization: Bearer <your_token>" \
-F "file=@devices.csv"

## RabbitMQ Queue
I used the default amq.topic exchange and routed messages to a queue named device_updates.

In RabbitMQ, I saw messages under:
Queues and Streams → device_updates

These messages were consumed and logged by device-processor.ts
## Screenshots 
Mongodb collections :
![Screenshot 2025-06-17 233347](https://github.com/user-attachments/assets/28db6da6-d7e8-44b6-85d4-8e6bc5d67089)

Device processor logs:
![Screenshot 2025-06-18 002844](https://github.com/user-attachments/assets/46d5a541-ee95-4177-8bb8-e794e2381754)

Rabbitmq Queue activity:
4 messages in ready queue(not consumed) 
![Screenshot 2025-06-17 231222](https://github.com/user-attachments/assets/90771bf0-9e61-4c19-8800-e540db42151c)

After consuming:
![Screenshot 2025-06-17 233410](https://github.com/user-attachments/assets/e780e7aa-dd93-44c3-940f-f4ed68cdc687)







