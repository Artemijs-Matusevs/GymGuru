# Folder Structure

- `src/config`:
    - `database.js`: Handles the database connection.
    - `passport.js`: Configures passport strategies and session management.

- `src/controllers`:
    - `authController.js`: Handles authentication-related HTTP requests.
    - `userController.js`: Handles user-related HTTP requests.

- `src/models`:
    - `userModel.js`: Contains data access functions related to user data.

- `src/routes`:
    - `index.js`: handles the root route.
    - `auth.js`: Handles authentication related routes.

- `src/services`:
    - `authService.js`: Contains business logic related to authentication and user management
    - `userService.js`: placeholder for additional user related logic

- `src/middlewares`:
    - `session.js`: handles express-session start up/config

- `src/utils`: placeholder for any utility functions/helpers

- `app.js`: main entry point of the web-app