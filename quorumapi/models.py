from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import (GenericForeignKey,
                                                GenericRelation)
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django_currentuser.middleware import get_current_authenticated_user


class Topic(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return "%s " % self.name


class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Others'),
    )
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='profile')
    contact_number = models.CharField(max_length=12)
    profile_pic = models.ImageField(
        upload_to='profile_pics', null=True, blank=True)
    topics = models.ManyToManyField(Topic, blank=True, related_name='topics')
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    dob = models.DateField()

    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
            post_save.connect(create_profile, sender=User)

    def get_first_name(self):
        return self.user.first_name

    def get_last_name(self):
        return self.user.last_name

    def get_followers_count(self):
        return Follow.objects.filter(
            user = self.user).exclude(follower = self.user).count()

    def get_following_count(self):
        return Follow.objects.filter(follower = self.user).count()

    def __str__(self):
        return "%s " % self.user.username


class Activity(models.Model):
    UP_VOTE = 'U'
    DOWN_VOTE = 'D'
    ACTIVITY_TYPES = (
        (UP_VOTE, 'Up Vote'),
        (DOWN_VOTE, 'Down Vote'),
    )
    activity_type = models.CharField(max_length=6, choices=ACTIVITY_TYPES)
    user = models.ForeignKey(Profile, null=True , on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True, null=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return "%s "% self.activity_type


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)
    pub_date = models.DateField(auto_now_add=True)
    topic =models.ManyToManyField(Topic )
    description = models.CharField(max_length = 100, null= True ,blank =True)
    vote = GenericRelation(Activity)

    def get_post_belongs_to_authenticated_user(self):
        return self.user.pk == get_current_authenticated_user().pk

    def get_user(self):
        user_dict = vars(self.user)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def down_vote_count(self):
        return self.vote.filter(activity_type='D').count()

    def up_vote_count(self):
        return self.vote.filter(activity_type='U').count()

    def __str__(self):
        return "%s " % self.id

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    answered_date = models.DateField(auto_now_add=True)
    vote = GenericRelation(Activity)

    def down_vote_count(self):
        return self.vote.filter(activity_type='D').count()

    def up_vote_count(self):
        return self.vote.filter(activity_type='U').count()
        
    def __str__(self):
        return "%s" % self.content

class Follow(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    follower = models.ForeignKey(User, on_delete=models.CASCADE , related_name='follower')
    
    # class Meta:
    #     unique_together = ('follower', 'user')

    def get_user_info(self):
        user_dict = vars(self.user)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def get_follower_info(self):
        user_dict = vars(self.follower)
        return {"id": user_dict["id"], "username": user_dict["username"]}

    def get_following(self, user):
        return Follow.objects.filter(follower=user)

    def get_followers(self, user):
        return Follow.objects.filter(user=user).exclude(follower=user)
    
    def get_following_count(self, user):
        return Follower.objects.filter(follower=user).count()

    def get_followers_count(self, user):
        return Follower.objects.filter(user=user).count()

    def __str__(self):
        return str(self.id)

class Comment(models.Model):
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="comments")
    answer = models.ForeignKey(Answer ,on_delete=models.CASCADE ,related_name="comments")
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return self.comment
