from rest_framework import serializers
from .models import Task
from users.serializers import UserSerializer # To nest user data

class TaskSerializer(serializers.ModelSerializer):
    assigned_user = UserSerializer(read_only=True) # Nested serializer for assigned user
    assigned_user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='assigned_user', write_only=True
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'status', 'assigned_user', 'assigned_user_id', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_assigned_user_id(self, value):
        # You can add more validation here, e.g., check if the user exists and is active
        if not User.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Assigned user does not exist.")
        return value
