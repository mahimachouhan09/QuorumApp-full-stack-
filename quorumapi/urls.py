from django.conf.urls import re_path, url
from django.urls import include, path
from rest_auth.views import PasswordResetConfirmView, PasswordResetView
from rest_framework import routers

from . import views
from .views import (AnswerViewSet, AnswerVoteViewSet, CommentViewSet,
                    CommentVoteViewSet, QuestionViewSet,
                    QuestionVoteViewSet, UserList)

router = routers.DefaultRouter()
router.register(r'profile', UserList, basename='profile')
router.register(r'questions', QuestionViewSet, basename='Question')
router.register(r'answers', AnswerViewSet, basename='Answer')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'questionvote', QuestionVoteViewSet, basename='QuestionVote')
router.register(r'answervote', AnswerVoteViewSet, basename='AnswerVote')
router.register(r'commentvote', CommentVoteViewSet, basename='commentVote')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('comments/<int:pk>/vote/', views.CommentViewSet, name='comment-vote'),
    path('comments/<int:pk>/vote/{"action":"down"}', views.CommentViewSet, name='comment-vote'),
    path('favorite-questions/', views.FavQuestionListView.as_view(), name='favorite_questions'),
    path('follow/<int:pk>/', views.follow, name='follow'),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    path(r'password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    re_path(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(
    ), name='password_reset_confirm'),
]
