# Task Management System

A Django-based REST API for task management with user authentication and JWT token support.

## 🚀 Features

- **User Management**: User registration, authentication, and profile management
- **Task Management**: Create, read, update, and delete tasks
- **JWT Authentication**: Secure API access with JSON Web Tokens
- **REST API**: RESTful endpoints for all operations
- **Admin Interface**: Django admin panel for backend management
- **SQLite Database**: Lightweight database for development

## 🛠️ Technology Stack

- **Backend**: Django 5.2.4
- **API Framework**: Django REST Framework
- **Authentication**: Django REST Framework SimpleJWT
- **Database**: SQLite (development)
- **Python Version**: 3.13

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Python 3.13
- pipenv (for dependency management)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TaskManagementSystem
   ```

2. **Install dependencies using pipenv**
   ```bash
   pipenv install
   ```

3. **Activate the virtual environment**
   ```bash
   pipenv shell
   ```

4. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/`

## 📁 Project Structure

```
TaskManagementSystem/
├── task_manager/           # Main project directory
│   ├── __init__.py
│   ├── asgi.py            # ASGI configuration
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py            # WSGI configuration
├── tasks/                 # Tasks app
│   ├── migrations/        # Database migrations
│   ├── __init__.py
│   ├── admin.py           # Admin configuration
│   ├── apps.py            # App configuration
│   ├── models.py          # Task models
│   ├── tests.py           # Unit tests
│   ├── urls.py            # Task URLs
│   └── views.py           # Task views
├── users/                 # Users app
│   ├── migrations/        # Database migrations
│   ├── __init__.py
│   ├── admin.py           # Admin configuration
│   ├── apps.py            # App configuration
│   ├── models.py          # User models
│   ├── tests.py           # Unit tests
│   ├── urls.py            # User URLs
│   └── views.py           # User views
├── db.sqlite3             # SQLite database
├── manage.py              # Django management script
├── Pipfile                # Pipenv dependencies
├── Pipfile.lock           # Locked dependencies
└── README.md              # This file
```

## 🔐 Authentication

This project uses JWT (JSON Web Tokens) for authentication. The following endpoints are available:

### Authentication Endpoints

- **Obtain Token**: `POST /api/token/`
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Refresh Token**: `POST /api/token/refresh/`
  ```json
  {
    "refresh": "your_refresh_token"
  }
  ```

- **Verify Token**: `POST /api/token/verify/`
  ```json
  {
    "token": "your_access_token"
  }
  ```

### JWT Configuration

- **Access Token Lifetime**: 60 minutes
- **Refresh Token Lifetime**: 1 day
- **Algorithm**: HS256

## 📚 API Endpoints

### Base URL: `http://localhost:8000/api/`

### Authentication
- `POST /api/token/` - Obtain JWT token pair
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/token/verify/` - Verify token validity

### Users
- User-related endpoints will be available at `/api/users/` (to be implemented)

### Tasks
- Task-related endpoints will be available at `/api/tasks/` (to be implemented)

## 🧪 Testing

Run the test suite:

```bash
python manage.py test
```

Run tests for a specific app:

```bash
python manage.py test users
python manage.py test tasks
```

## 🔧 Configuration

### Environment Variables

For production deployment, consider setting the following environment variables:

- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to `False` in production
- `DATABASE_URL`: Database connection string
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts

### Settings

Key settings can be found in `task_manager/settings.py`:

- **Database**: SQLite for development (consider PostgreSQL for production)
- **Pagination**: 10 items per page
- **Authentication**: JWT with session authentication fallback
- **Permissions**: Authenticated users only by default

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set up production environment variables
2. **Database**: Switch to PostgreSQL or MySQL for production
3. **Static Files**: Configure static file serving
4. **Security**: Update `SECRET_KEY`, set `DEBUG=False`, configure `ALLOWED_HOSTS`
5. **HTTPS**: Ensure HTTPS is enabled
6. **CORS**: Configure CORS if needed for frontend integration

### Docker (Optional)

You can containerize this application using Docker. Create a `Dockerfile`:

```dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY Pipfile Pipfile.lock ./
RUN pip install pipenv && pipenv install --system --deploy

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 Development Notes

### Next Steps

The project is currently set up with the basic structure. To complete the implementation:

1. **Define Models**: Add Task and User models in their respective `models.py` files
2. **Create Serializers**: Add DRF serializers for API data validation
3. **Implement Views**: Create API views for CRUD operations
4. **Add URL Patterns**: Define URL patterns for the API endpoints
5. **Write Tests**: Add comprehensive test coverage
6. **Add Documentation**: Consider adding API documentation with tools like drf-spectacular

### Code Quality

- Follow PEP 8 style guidelines
- Write comprehensive tests
- Use type hints where appropriate
- Add docstrings to functions and classes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Happy Coding! 🎉**
