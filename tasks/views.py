from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer

# Endpoint: POST /tasks (Create a new task)
# Endpoint: GET /tasks (List all tasks)
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] # Private

    def perform_create(self, serializer):
        # Optionally, you can set the creator of the task here if needed
        serializer.save()

# Endpoint: GET /tasks/{taskId} (Retrieve a specific task by ID)
# Endpoint: PUT /tasks/{taskId} (Update a task)
# Endpoint: DELETE /tasks/{taskId} (Delete a task by ID)
class TaskDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated] # Private
    lookup_field = 'pk' # Uses 'id' by default

    def perform_destroy(self, instance):
        # Optional: Add logic before deletion, e.g., logging
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
