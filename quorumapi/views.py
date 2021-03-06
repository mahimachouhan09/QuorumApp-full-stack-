from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from rest_framework import generics, permissions, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from vote.views import VoteMixin

from .models import (Answer, AnswerVote, Comment, CommentVote, Follow, Profile,
                     Question, QuestionVote)
from .paginators import UserPagination
from .permissions import IsInstanceOwner
from .serializers import (AnswerSerializer, AnswerVoteSerializer,
                          CommentSerializer, CommentVoteSerializer,
                          FollowerSerializer, ProfileSerializer,
                          QuestionSerializer, QuestionVoteSerializer)


class UserList(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    pagination_class = UserPagination
    queryset = Profile.objects.all()
    filter_backends = (SearchFilter,)
    search_fields = ['user__username', ]
    permission_classes = [IsAuthenticated, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


@login_required
def follow(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.user.is_authenticated:
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
    return HttpResponseRedirect('/')


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
    search_fields = ['user__username', 'question']
    permission_classes = [IsAuthenticated, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class FavQuestionListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, ]
    api_view = ['GET', ]
    serializer_class = QuestionSerializer
    search_fields = ['user__username', 'question']

    def get_queryset(self):
        return Question.objects.filter(is_favorite=True)


class QuestionVoteViewSet(viewsets.ModelViewSet):
    queryset = QuestionVote.objects.all()
    serializer_class = QuestionVoteSerializer
    pagination_class = UserPagination
    permission_classes = [IsAuthenticated, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class AnswerVoteViewSet(viewsets.ModelViewSet):
    queryset = AnswerVote.objects.all()
    serializer_class = AnswerVoteSerializer
    pagination_class = UserPagination
    permission_classes = [IsAuthenticatedOrReadOnly, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CommentVoteViewSet(viewsets.ModelViewSet):
    queryset = CommentVote.objects.all()
    serializer_class = CommentVoteSerializer
    pagination_class = UserPagination
    permission_classes = [IsAuthenticatedOrReadOnly, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    pagination_class = UserPagination
    permission_classes = [IsAuthenticatedOrReadOnly, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class Followers(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = get_object_or_404(User, pk=self.kwargs["pk"])
        return Follow.objects.filter(user=user).exclude(follower=user)


class CommentViewSet(viewsets.ModelViewSet, VoteMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = UserPagination
    permission_classes = [IsAuthenticatedOrReadOnly, IsInstanceOwner, ]

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
