from django.contrib import admin
<<<<<<< HEAD
from django.contrib.staticfiles.urls import static, staticfiles_urlpatterns
from django.urls import include, path

from . import settings

=======
from django.urls import include, path

>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
urlpatterns = [
    path('admin/', admin.site.urls),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('', include('quorumapi.urls')),
]
<<<<<<< HEAD
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
=======
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
