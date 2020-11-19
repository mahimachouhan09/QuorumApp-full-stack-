from django.contrib import admin
<<<<<<< HEAD

from .models import Activity, Answer, Comment, Follow, Profile, Question
=======
from .models import Activity, Answer, Comment, Follow, Profile, Question, Topic
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

admin.site.register(Activity)
admin.site.register(Answer)
admin.site.register(Comment)
admin.site.register(Follow)
<<<<<<< HEAD
=======
admin.site.register(Topic)
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
admin.site.register(Profile)
admin.site.register(Question)
