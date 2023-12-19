# Room Booking MERN Full Stack Project

This is a full stack web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack for managing room bookings. The application allows two types of users: house owners and customers. House owners can create, edit, and delete rooms, set booking periods, and upload photos. Customers can browse available rooms, view room details and photos, check availability on a calendar, and make bookings.

## Features

- User Management:
  - House owners can register for an account using an email address and a mobile number.
  - Customers can register for an account using an email address and a mobile number.

- House Owner Features:
  - Create, edit, and delete rooms with their details.
  - Set the minimum and maximum booking period for each room.
  - Set the rent amount for each day.
  - Upload photos for each room.

- Customer Features:
  - Browse all available rooms for booking.
  - View details and photos of each room.
  - Check the availability of rooms on a calendar.
  - Choose dates and make bookings.

## Technologies Used

- Front-end:
  - React.js: JavaScript library for building user interfaces.
  - HTML5: Markup language for structuring the application.
  - CSS3: Styling language for designing the application.
  - Bootstrap: Front-end framework for responsive and mobile-first design.

- Back-end:
  - Node.js: JavaScript runtime environment for server-side development.
  - Express.js: Web application framework for Node.js.
  - MongoDB: NoSQL database for storing room and user data.
  - Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.

- Additional Tools:
  - Axios: Promise-based HTTP client for making API requests.
  - JSON Web Tokens (JWT): Token-based authentication for securing user sessions.
  - bcrypt.js: Password hashing library for secure user authentication.
  - React Router: Library for handling routing in React applications.

## Installation

1. Clone the repository:

   ````bash
   git clone https://github.com/your-username/room-booking-mern.git
   ```

2. Install the dependencies for both the server and client:

   ````bash
   # Install server dependencies
   cd room-booking-mern/server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the `server` directory.
   - Define the following environment variables in the `.env` file:
     - `MONGO_URI`: MongoDB connection URI.
     - `JWT_SECRET`: Secret key for JWT token generation.

4. Start the server and client:

   ````bash
   # Start the server
   cd room-booking-mern/server
   npm start

   # Start the client
   cd ../client
   npm start
   ```

5. Access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.

## Folder Structure

The project has the following folder structure:

```
room-booking-mern/
├── server/         # Server-side code
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # Express routes
│   ├── middleware/     # Middleware functions
│   ├── config/         # Configuration files
│   └── server.js       # Server entry point
│
└── client/         # Client-side code
    ├── public/         # Static files
    ├── src/            # React application code
    │   ├── components/ # Reusable components
    │   ├── pages/      # Application pages
    │   ├── services/   # API services
    │   ├── utils/      # Utility functions
    │   ├── assets/     # Images and other assets
    │   ├── App.js      # Main application component
    │   ├── index.js    # React application entry point
    │   └── index.css   # Global CSS styles
    │
    ├── package.json    # Client-side dependencies and scripts
    └── .env            # Client-side environment variables
```

## Contributing

Contributions to the project are welcome. If you have any improvements or bug fixes, feel free to open a pull request. Please make sure to follow the existing coding style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Bootstrap](https://getbootstrap.com/)

## Contact

For any questions or inquiries, please contact [your-email](mailto:your-email@example.com).
