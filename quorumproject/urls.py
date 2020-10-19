from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', include('quorumapi.urls')),
]
