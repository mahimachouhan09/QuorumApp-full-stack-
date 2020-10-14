from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics ,mixins, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import Activity, Answer,Profile, Topic, Follow, Question
from .serializers import ActivitySerializerRelatedField, AnswerSerializer, UserSerializer, TopicSerializer, FollowerSerializer, QuestionSerializer
from .permissions import IsInstanceOwner
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.exceptions import ValidationError

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

class TopicViewSet(viewsets.ModelViewSet):
    queryset =Topic.objects.all()
    serializer_class = TopicSerializer
    # filter_backends = [filters.OrderingFilter]    

@login_required
def follow(request, pk):
    queryset = Follow.objects.all()
    user = get_object_or_404(User, pk = pk)
    
    if user!=request.user:
        already_followed = Follow.objects.filter(user = user, follower = request.user).first()
        if not already_followed:
            
            new_follower = Follow(user = user, follower = request.user)
            new_follower.save()
            follower_count = Follow.objects.filter(user = user).count()
            return JsonResponse({'status': 'Following', 'count': follower_count})
        else:
            already_followed.delete()
            follower_count = Follow.objects.filter(user = user).count()
            return JsonResponse({'status': 'Not following', 'count': follower_count})
        return redirect('/')
    raise ValidationError("One Cannot follow themselves")


class Following(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(User, pk = self.kwargs["pk"])
        return Follow.objects.filter(follower = user)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    def create(self, request, *args, **kwargs):
        user = None
        try:
            if request and hasattr(request, "user"):
                user = request.user
                if request.data.get('question'):
                    query = Question.objects.create(
                        user=user,
                        question=request.data.get('question'),
                        )
                    return Response(self.get_serializer(query, many=False).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,)

    # def get_queryset(self):
    #     user = get_object_or_404(User, pk = self.kwargs["pk"])
    #     return Question.objects.filter(follower = user)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    
    def create(self, request, *args, **kwargs):
        # import pdb;pdb.set_trace()
        user = None
        try:
            if request and hasattr(request, "user"):
                user = request.user
                if request.data.get('question'):
                    query = Answer.objects.create(
                        user=user,
                        question=request.data.get('question'),
                        content=request.data.get('content'),
                        )
                    return Response(self.get_serializer(query, many=False).data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST,)

    # def get_permissions(self,request):

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializerRelatedField
    # permission_classes = [permissions.IsAuthenticated]


class Followers(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(User, pk = self.kwargs["pk"])
        return Follow.objects.filter(user = user).exclude(follower = user)