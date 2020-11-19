from django.contrib import admin

from .models import Answer, Comment, Follow, Profile, Question

admin.site.register(Answer)
admin.site.register(Comment)
admin.site.register(Follow)
admin.site.register(Profile)
admin.site.register(Question)
