<<<<<<< HEAD
from django.conf.urls import re_path, url
from django.urls import include, path
from rest_auth.views import PasswordResetConfirmView, PasswordResetView
=======
from django.conf.urls import url
from django.urls import include, path
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
from rest_framework import routers

from . import views
from .views import (ActivityViewSet, AnswerViewSet, CommentViewSet,
<<<<<<< HEAD
                    QuestionViewSet, UserList)

router = routers.DefaultRouter()
router.register(r'profile', UserList, basename='profile')
=======
                    QuestionViewSet, TopicViewSet, UpdateApiView, UserList)

router = routers.DefaultRouter()
router.register(r'update-profile', UpdateApiView, basename='update-profile')
router.register(r'topics', TopicViewSet, basename='Topic')
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
router.register(r'questions', QuestionViewSet, basename='Question')
router.register(r'answers', AnswerViewSet, basename='Answer')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'activity', ActivityViewSet, basename='activity')

urlpatterns = [
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
<<<<<<< HEAD
=======
    path('users/', UserList.as_view(), name="user-list"),
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
    path('follow/<int:pk>/', views.follow, name='follow'),
    path('following/<int:pk>/', views.Following.as_view(), name='following'),
    path('followers/<int:pk>/', views.Followers.as_view(), name='followers'),
    path('api-auth/', include(
<<<<<<< HEAD
        'rest_framework.urls', namespace='rest_framework')),
    path(r'password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    re_path(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(
    ), name='password_reset_confirm'),
=======
        'rest_framework.urls', namespace='rest_framework'))
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
]
