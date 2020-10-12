from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics ,mixins, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Profile
from .serializers import UserSerializer 
from .permissions import IsInstanceOwner

# class UserCreateView(generics.GenericAPIView):
#   serializer_class = serializers.CustomRegisterSerializer

#   def post(self, request, *args, **kwargs):
#     serializer = self.get_serializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.save()
#     return Response({
#         "user": serializers.CustomRegisterSerializer(user, context=self.get_serializer_context()).data,
#         "token": AuthToken.objects.create(user)
#     })

class UserList(generics.ListCreateAPIView):
    permission_classes = []
    # permission_classes = (IsAuthenticatedOrWriteOnly,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class UpdateApiView(generics.UpdateAPIView):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()

#     # def get(self, request, pk=None):       
#     #     try:         
#     #         queryset = self.get_queryset().get(id=request.user.id)          
#     #         serializer = ProfileSerializer(queryset, many=True)             
#     #         return Response(serializer.data, status=status.HTTP_200_OK)         
#     #     except(User.DoesNotExist):  
#     #         return Response({"error": 'The user does not exist'},status=status.HTTP_204_NO_CONTENT)

#     def patch(self, request, format=None):
#         user = UserSerializer(data=request.data)
#         if user.is_valid():
#             user.update(instance=request.user)
#             return Response(HTTP_200_OK)
#         return Response(user.errors)

class UpdateApiView(mixins.ListModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin, mixins.DestroyModelMixin,viewsets.GenericViewSet):
    queryset =User.objects.all()
    serializer_class = UserSerializer   
    permission_classes = [IsAuthenticated,] 
    # lookup_fields = ['username',]     
    filter_backends = (SearchFilter,)     
    search_fields = ['email', 'username',] 
    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
        'get_user_profile': [IsInstanceOwner]
    }

    def get_user_profile(self, request, pk=None): 
        try:         
            queryset = self.get_queryset().get(id=request.user.id)          
            serializer = UserSerializer(queryset, many=True)             
            return Response(serializer.data, status=status.HTTP_200_OK)         
        except(User.DoesNotExist):  
            return Response({"error": 'The user does not exist'},status=status.HTTP_204_NO_CONTENT)
