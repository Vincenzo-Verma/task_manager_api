#Task Management REST API
Project Description
This project implements a RESTful API for a simple Task Management System, allowing users to manage tasks with standard CRUD (Create, Read, Update, Delete) operations. The API is built using Django and Django REST Framework (DRF), providing a robust and scalable backend solution.
The API adheres to the functional requirements outlined in the "GEMS Backend Task" document, including user authentication with JWT, comprehensive data validation, graceful error handling, and clear API documentation.
Features
 * User Management:
   * Register new users (public access).
   * Retrieve a list of all registered users (private access).
   * Get details of a specific user (private access).
   * Update a user's information (private access, self-update or admin).
 * Task Management:
   * Create new tasks with title, description, due date, and assigned user (private access).
   * List all tasks (private access).
   * Retrieve details of a specific task by ID (private access).
   * Update task information (title, description, status, due date) (private access).
   * Delete tasks by ID (private access).
 * Authentication & Authorization:
   * Secure endpoints using JSON Web Tokens (JWT).
   * Public endpoints for user registration and token acquisition.
   * Private endpoints requiring authenticated user access.
 * Data Validation & Error Handling:
   * Robust input data validation implemented via Django REST Framework serializers.
   * Appropriate HTTP status codes and descriptive error messages for various scenarios (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found).
 * Database:
   * Uses Django's ORM for data persistence. Configured for SQLite by default, easily switchable to PostgreSQL, MySQL, etc.
   * Defined schemas for User (Django's built-in) and Task models with efficient querying in mind.
 * API Documentation:
   * Interactive API documentation generated using drf-yasg (Swagger UI and ReDoc).
   * Details each endpoint, request/response formats, and possible error responses.
 * Code Quality:
   * Follows Django and DRF best practices for clean, maintainable, and modular code organization.
Technologies Used
 * Python: Programming language
 * Django: Web framework
 * Django REST Framework (DRF): Toolkit for building Web APIs
 * djangorestframework-simplejwt: For JWT authentication
 * drf-yasg: For OpenAPI/Swagger documentation generation
 * SQLite: Default database (can be configured for PostgreSQL, MySQL, etc.)
Setup & Installation
Follow these steps to set up and run the project locally:
 * Clone the repository:
   git clone <your-repository-url>
cd task-management-api

 * Create a virtual environment:
   It's highly recommended to use a virtual environment to manage project dependencies.
   python -m venv venv

 * Activate the virtual environment:
   * On macOS/Linux:
     source venv/bin/activate

   * On Windows:
     venv\Scripts\activate

 * Install dependencies:
   pip install Django djangorestframework djangorestframework-simplejwt drf-yasg

 * Apply database migrations:
   This will create the necessary database tables based on the defined models.
   python manage.py makemigrations users tasks
python manage.py migrate

 * Create a superuser (for admin access and testing private endpoints):
   You'll be prompted to enter a username, email, and password.
   python manage.py createsuperuser

Database Configuration
By default, the project uses SQLite, which is suitable for local development. The database file (db.sqlite3) will be created in the project root.
To use a different database (e.g., PostgreSQL), modify the DATABASES setting in task_manager_project/settings.py:
# task_manager_project/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your_database_name',
        'USER': 'your_database_user',
        'PASSWORD': 'your_database_password',
        'HOST': 'localhost', # Or your database host (e.g., 'db' if using Docker)
        'PORT': '',          # Or your database port (e.g., '5432')
    }
}

Remember to install the corresponding database adapter (e.g., pip install psycopg2-binary for PostgreSQL). After changing the database settings, run python manage.py migrate again.
API Endpoints
The following table details the available API endpoints:
| Endpoint | Method | Description | Access |
|---|---|---|---|
| /api/users/ | POST | Register a new user (username, email, password). | Public |
| /api/users/list/ | GET | Get a list of all users. | Private |
| /api/users/{userId}/ | GET | Get details of a specific user. | Private |
| /api/users/{userId}/ | PUT | Update a user's information (name, email). | Private |
| /api/tasks/ | POST | Create a new task (title, description, due date, assigned user ID). | Private |
| /api/tasks/ | GET | List all tasks (task id, title). | Private |
| /api/tasks/{taskId}/ | GET | Retrieve a specific task by ID. | Private |
| /api/tasks/{taskId}/ | PUT | Update a task (title, description, status, due date). | Private |
| /api/tasks/{taskId}/ | DELETE | Delete a task by ID. | Private |
| /api/token/ | POST | Obtain JWT access and refresh tokens. | Public |
| /api/token/refresh/ | POST | Refresh an expired access token using a refresh token. | Public |
| /api/token/verify/ | POST | Verify the validity of an access token. | Public |
Authentication
This API uses JWT (JSON Web Tokens) for authentication.
 * Obtain Tokens:
   Send a POST request to /api/token/ with username and password in the request body.
   {
    "username": "your_username",
    "password": "your_password"
}

   The response will contain access (short-lived) and refresh (long-lived) tokens.
 * Using Access Token:
   For all private endpoints, include the access token in the Authorization header of your requests:
   Authorization: Bearer <your_access_token>
 * Refreshing Tokens:
   When your access token expires, use the refresh token by sending a POST request to /api/token/refresh/ with the refresh token in the body:
   {
    "refresh": "your_refresh_token"
}

   This will provide a new access token.
Running the Application
Once setup is complete, run the Django development server:
python manage.py runserver

The API will be accessible at http://127.0.0.1:8000/api/.
Testing the API
You can use API clients like Postman, Insomnia, or curl to test the endpoints.
Example curl Commands:
 * Register a User:
   curl -X POST http://127.0.0.1:8000/api/users/ \
-H "Content-Type: application/json" \
-d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securepassword123",
    "password2": "securepassword123",
    "first_name": "New",
    "last_name": "User"
}'

 * Obtain JWT Token:
   curl -X POST http://127.0.0.1:8000/api/token/ \
-H "Content-Type: application/json" \
-d '{
    "username": "newuser",
    "password": "securepassword123"
}'
# Copy the "access" token from the response

 * List All Users (requires authentication):
   Replace <YOUR_ACCESS_TOKEN> with the token obtained above.
   curl -X GET http://127.0.0.1:8000/api/users/list/ \
-H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"

 * Create a Task (requires authentication):
   Replace <YOUR_ACCESS_TOKEN> and assigned_user_id (e.g., 1 for the first user created).
   curl -X POST http://127.0.0.1:8000/api/tasks/ \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_ACCESS_TOKEN>" \
-d '{
    "title": "Learn Django",
    "description": "Study Django REST Framework documentation.",
    "due_date": "2025-09-01",
    "status": "TODO",
    "assigned_user_id": 1
}'

API Documentation (Swagger/ReDoc)
Interactive API documentation is available at:
 * Swagger UI: http://127.0.0.1:8000/swagger/
 * ReDoc: http://127.0.0.1:8000/redoc/
These interfaces provide a detailed overview of all endpoints, their parameters, expected responses, and allow you to test API calls directly from the browser.
Code Quality & Structure
The project is structured into logical Django apps (users, tasks) to promote modularity and separation of concerns. Django REST Framework's class-based views and serializers are utilized for clean and efficient API development. Code adheres to PEP 8 guidelines, and comments are provided for clarity where necessary.
Future Enhancements (Optional)
 * Filtering and Searching for Tasks: Implement options to filter tasks by status, due date, or assigned user, and search by title/description.
 * Pagination for Task List: While DRF's default pagination is enabled, fine-tune it for better user experience.
 * User Permissions for Tasks: Implement more granular permissions (e.g., only assigned user or task creator can update/delete a task).
 * Email Notifications: Send email notifications for task assignments or due date reminders.
 * Dockerization: Containerize the application for easier deployment.
 * CI/CD Pipeline: Set up a Continuous Integration/Continuous Deployment pipeline for automated testing and deployment.
 * Unit and Integration Tests: Write comprehensive tests for all API endpoints and business logic.
