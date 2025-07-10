# 🧩 User Management Backend (Temporal + Auth0 + MongoDB)

This is a **backend-only Node.js project** that manages users using:

- 🔁 [Temporal.io](https://temporal.io/) — for long-running workflows

- 🔐 [Auth0](https://auth0.com/) — for user authentication & identity

- 🗃️ [MongoDB](https://www.mongodb.com/) — for tracking user status

---

## 📦 Features

- ✔️ Create users in Auth0 via Temporal workflow

- ✔️ Update user info (name, password)

- ✔️ Delete users from Auth0

- ✔️ Track provisioning status in MongoDB

- ✔️ View user list from Auth0

- ✔️ Status updates: `provisioning`, `success`, `updated`, `deleted`, `failed`

---

## ⚙️ Technologies Used

- Node.js + Express
- Temporal Workflows
- Auth0 Management API
- MongoDB + Mongoose
- TypeScript

---


## 📂 Sample Folder Structure

```
User-Management/
│
├── backend/                            # Node.js backend (Express API server)
│   ├── controllers/                    # API logic: triggers workflows
│   │   └── userController.js
│   ├── routes/                         # Express routes
│   │   └── userRoutes.js
│   ├── models/                         # MongoDB (Mongoose) models
│   │   └── User.js
│   ├──── .env                          # Environment variables
│   │   
│   ├── workflows/                      # Temporal client (not actual workflows!)
│   │   ├── client.ts                   # Creates Temporal connection + client
│   │   └── triggerCreateUser.ts       # Uses client to start createUserWorkflow
│   └── index.js                        # Main entry: Express server setup
│
├── temporal/                           # Temporal logic (TypeScript SDK)
│   ├── workflows/                      # Actual workflow definitions
│   │   ├── createUserWorkflow.ts
│   │   ├── updateUserWorkflow.ts
│   │   └── deleteUserWorkflow.ts
│   ├── activities/                     # Logic called from workflows
│   │   ├── auth0Activities.ts         # Call Auth0 API
│   │   └── mongoActivities.ts         # Update status in MongoDB
│   └── worker.ts                       # Worker that runs the workflows
│   └── auth0Service.js
├___├── .env                           # Environment variables
│                               
├── package.json                        # Root config (optional if split)
└── README.md




```

---



## Request URL's


# 📩 CREATE USER
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Temp@1234",
    "name": "Test User"
  }'

# 🔁 UPDATE USER
curl -X PUT http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "updates": {
      "name": "Updated Test User"
    }
  }'


  # ❌ DELETE USER
curl -X DELETE http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com"
  }'


# 📃 LIST USERS
curl http://localhost:5000/api/users | jq




## 📁 Repository

🔗 [GitHub Repository](https://github.com/dipalisurve2377/user-management-app)




## 🏁 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/dipalisurve2377/user-management-app
   cd user-management-app