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



# The original template:
1) `src` folder contains all application-related code.
	1) `config` folder contains configuration files and environment set up.
	2) `controllers` folder handles incoming HTTP requests and delegates to services.
	3) `models` folder contains database models or data access logic.
	4) `routes` folder defines application routes and maps them to controllers.
	5) `services` folder contains the business logic and interacts with the data (model) layer.
	6) `middlewares` folder contains custom middleware functions.
	7) `utils` folder contains utility functions and helpers. 
	8) `views` contains templating files EJS etc...
2) `public` folder contains static files e.g. CSS, JavaScript, images etc...
