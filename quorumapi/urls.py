from django.conf.urls import re_path, url
from django.urls import include, path
from rest_auth.views import PasswordResetConfirmView, PasswordResetView
from rest_framework import routers
from .views import AnswerViewSet,ActivityViewSet, CommentViewSet, UserList, UpdateApiView, TopicViewSet, QuestionViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'update-profile', UpdateApiView, basename='update-profile')
router.register(r'topics', TopicViewSet, basename='Topic')
router.register(r'questions', QuestionViewSet, basename='Question')
router.register(r'answers', AnswerViewSet, basename='Answer')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'activity', ActivityViewSet, basename='activity')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    path('users/', UserList.as_view(), name="user-list"),
    path('follow/<int:pk>/', views.follow, name='follow'),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]