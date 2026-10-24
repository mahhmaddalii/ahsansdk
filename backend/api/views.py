from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    return Response({
        "status": "ok",
        "message": "Backend is running"
    })


@api_view(["GET"])
@permission_classes([AllowAny])
def hello(request):
    return Response({
        "message": "Hello from Django!"
    })