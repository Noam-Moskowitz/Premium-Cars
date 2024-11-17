Here's the updated README with the additional information:  

---

# Premium Cars  

## Project Summary  

**Premium Cars** is a full-stack web application built from scratch, enabling users to rent cars online seamlessly. The app provides a user-friendly interface for browsing and filtering cars based on preferences, reserving cars for specified dates, and managing reservations.  

### Key Features:  
- **User Experience:**  
  - Browse and filter cars.  
  - Reserve cars for available dates.  
  - View, edit, or cancel reservations via the *My Orders* screen.  
  - Switch between **Dark Mode** and **Light Mode** for a personalized viewing experience.  

- **Admin Features:**  
  - View all incoming orders.  
  - Edit or cancel any reservation.  
  - Manage the inventory of cars and branches (CRUD operations).  

The app supports a complete experience for both users and administrators.  

### Design Process:  
The initial design was created using **Canva**, ensuring a well-thought-out user interface and branding. Custom assets like the **logo** and some images were crafted from scratch to give the app a unique and professional appearance.  

---  

## Folder Structure  

### Root Directory  
- **README.md** *(You're here!)*  
- **frontend/** *(Frontend application files)*  
- **backend/** *(Backend API and business logic)*  

---  

### Frontend  
Located in the **frontend/** directory:  

- **src/**  
  - **components/**: Reusable UI components.  
  - **pages/**: Application screens (e.g., Home, Orders, Admin Dashboard).  
  - **assets/**: Static files such as images, icons, and the custom-designed logo.  
  - **utils/**: Helper functions.  

- **public/**  
  - Contains public assets accessible without build steps.  

- **tailwind.config.js**  
  - Tailwind CSS configuration for custom themes, including Dark and Light modes.  

- **tsconfig.json**  
  - TypeScript configuration.  

- **package.json**  
  - Frontend dependencies and scripts.  

#### Required Environment Variables  
Create a `.env` file in the **frontend** directory with the following:  
```  
VITE_SERVER_IP=localhost  
VITE_SERVER_PORT=4040  
```  

---  

### Backend  
Located in the **backend/** directory:  

- **src/**  
  - **controllers/**: Handles request logic for various endpoints.  
  - **models/**: Mongoose schemas for MongoDB.  
  - **routes/**: Express routes for API endpoints.  
  - **utils/**: Server-side helpers.  

- **package.json**  
  - Backend dependencies and scripts.  

#### Required Environment Variables  
Create a `.env` file in the **backend** directory with the following:  
```  
ENVIROMENT=development  
PORT=4040  
ATLAS_URI=<Your MongoDB Atlas Connection String>  
MONGO_DB_URL=mongodb://127.0.0.1:27017/premium-cars  
JWT_SECRET=premiu%%$26m-cars4361223&&8403  
```  

---  

## Tech Stack  

### **Frontend**  
- **React**: Core library for building the user interface.  
- **TypeScript**: For type safety and improving code quality.  
- **Tailwind CSS**: Utility-first CSS framework for styling, with custom themes for **Dark and Light modes**.  
- **Shadcn UI**: Component library for building accessible and highly customizable UI.  
- **React Router**: Handles client-side routing.  
- **React Query**: Manages server state and query caching, optimizing API interactions.  
- **Redux**: Global state management across components.  
- **React Hook Form**: Lightweight form handling for managing form validation and state.  
- **Zod**: Schema validation and type safety for forms and API responses.  
- **Axios**: HTTP client for making requests to the backend.  
- **Vite**: Fast development server and build tool.  

### **Backend**  
- **Node.js**: Runtime environment for building server-side applications.  
- **Express.js**: Web framework for creating API endpoints.  
- **Mongoose**: ORM for MongoDB, simplifying database operations.  
- **Joi**: Validates incoming data to ensure integrity.  
- **JWT (jsonwebtoken)**:  
  - Generates secure tokens for user authentication.  
  - Ensures each session is securely identified.  
- **Bcrypt**: Hashes passwords for secure storage in the database.  
- **Dotenv**: Loads environment variables from `.env` files to keep sensitive information secure.  
- **CORS**: Enables secure communication between frontend and backend on different origins.  

### Development Tools  
- **ESLint**: Enforces consistent code style and catches syntax issues.  
- **Prettier**: Formats code to ensure readability.  

---  

## How to Set Up and Run the Project  

### Prerequisites  
- **Node.js** (>= 16.x)  
- **MongoDB** (>= 5.x)  

### Initial Setup  

1. Clone the repository and navigate into the project root.  
   ```bash  
   git clone <repository-url>  
   cd Premium-Cars  
   ```  

2. **Frontend Setup**  
   - Navigate to the `frontend` folder and install dependencies:  
     ```bash  
     cd frontend  
     npm install  
     ```  
   - Run the frontend:  
     ```bash  
     npm run start  
     ```  

3. **Backend Setup**  
   - Navigate to the `backend` folder and install dependencies:  
     ```bash  
     cd ../backend  
     npm install  
     ```  
   - Run the backend:  
     ```bash  
     npm run start  
     ```  

### Loading Sample Data  
Upon running the app for the first time, you'll be prompted to load sample data.  
Choose **yes** to populate the app with sample data, providing a complete project experience.  

---  

Let me know if you need more changes!
