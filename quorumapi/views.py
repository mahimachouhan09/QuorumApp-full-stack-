from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect
from rest_framework import (filters, generics, mixins, permissions, status,
                            viewsets)
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Activity, Answer, Comment, Follow, Question, Topic
from .paginators import UserPagination
from .permissions import IsInstanceOwner
from .serializers import (ActivitySerializerRelatedField, AnswerSerializer,
                          CommentSerializer, FollowerSerializer,
                          QuestionSerializer, TopicSerializer, UserSerializer)


class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    pagination_class = UserPagination
    queryset = User.objects.all()

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateApiView(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = (SearchFilter,)
    pagination_class = UserPagination
    search_fields = ['user__username', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
        'get_user_profile': [IsInstanceOwner]
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in
                self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),

    def get_user_profile(self, request, pk=None):
        try:
            queryset = self.get_queryset().get(id=request.user.id)
            serializer = UserSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except(User.DoesNotExist):
            return Response(
                {"error": 'The user does not exist'},
                status=status.HTTP_204_NO_CONTENT)


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    pagination_class = UserPagination
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['topics__topics', ]


@login_required
def follow(request, pk):
    user = get_object_or_404(User, pk=pk)

    if user != request.user:
        already_followed = Follow.objects.filter(
            user=user, follower=request.user).first()
        if not already_followed:

            new_follower = Follow(user=user, follower=request.user)
            new_follower.save()
            follower_count = Follow.objects.filter(user=user).count()
            return JsonResponse(
                {'status': 'Following', 'count': follower_count})
        else:
            already_followed.delete()
            follower_count = Follow.objects.filter(
                user=user).count()
            return JsonResponse(
                {'status': 'Not following', 'count': follower_count})
        return redirect('/')
    raise ValidationError("One Cannot follow themselves")


class Following(generics.ListCreateAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['user__username', ]
    ordering_fields = ['user__username', ]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follow.objects.filter(follower=user)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = UserPagination
    search_fields = ['topic__name', 'user__username']

    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in
                self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pagination_class = UserPagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['question__question', ]
    ordering_fields = ['question__question', ]
    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
    }

    def get_permissions(self):
        try:
            return [
                permission() for permission in
                self.permission_classes_by_action[
                    self.action]]
        except KeyError:
            return (permissions.IsAuthenticated(),)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializerRelatedField
    pagination_class = UserPagination

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class Followers(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowerSerializer
    pagination_class = UserPagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follow.objects.filter(user=user).exclude(follower=user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = UserPagination
    permission_classes_by_action = {
        'partial_update': [IsInstanceOwner],
        'destroy': [IsInstanceOwner],
        'update': [IsInstanceOwner],
    }

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
