from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer, UserRegistrationSerializer, UserUpdateSerializer

# Endpoint: POST /users (Register a new user)
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] # Public access for registration

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "User registered successfully.",
            "user_id": user.id,
            "username": user.username,
            "email": user.email
        }, status=status.HTTP_201_CREATED)

# Endpoint: GET /users (Get a list of all users)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # Private (Any logged-in user)

# Endpoint: GET /users/{userId} (Get details of a specific user)
# Endpoint: PUT /users/{userId} (Update a user's information)
class UserDetailUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated] # Private (Any logged-in user)
    lookup_field = 'pk' # Uses 'id' by default, but explicitly states for clarity

    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UserUpdateSerializer
        return UserSerializer

    def get_object(self):
        # Allow a user to view/update their own profile or if they are an admin
        obj = super().get_object()
        if self.request.user.is_staff or self.request.user == obj:
            return obj
        # Optionally, you could raise a different permission denied if not admin/self
        from rest_framework.exceptions import PermissionDenied
        raise PermissionDenied("You do not have permission to access this user's details.")

    def put(self, request, *args, **kwargs):
        # Ensure the user can only update their own profile unless they are an admin
        instance = self.get_object()
        if not (request.user.is_staff or request.user == instance):
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not have permission to update this user's details.")

        serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True allows partial updates
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
