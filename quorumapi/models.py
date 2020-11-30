from django.contrib.auth.models import User
from django.db import models
from django_currentuser.middleware import get_current_authenticated_user


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
    contact_number = models.CharField(max_length=13)
    profile_pic = models.ImageField(
        upload_to='frontend/src/profile_pics', null=True, blank=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    dob = models.DateField()

    def get_user_id(self):
        return self.user.pk

    def get_username(self):
        return self.user.username

    def get_first_name(self):
        return self.user.first_name

    def get_last_name(self):
        return self.user.last_name

    def get_followers_count(self):
        return Follow.objects.filter(
            user=self.user).exclude(follower=self.user).count()

    def get_following_count(self):
        return Follow.objects.filter(follower=self.user).count()

    def get_follow_status(self):
        follow_status = Follow.objects.filter(
            user=self.user,
            follower=get_current_authenticated_user())
        return "Following" if follow_status else "Follow"

    def __str__(self):
        return "%s " % self.user.username


class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.CharField(max_length=200)
    pub_date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=100, null=True, blank=True)

    def get_post_belongs_to_authenticated_user(self):
        return self.user == get_current_authenticated_user()

    def get_user(self):
        user_dict = vars(self.user)
        return {"username": user_dict["username"]}

    def __str__(self):
        return "%s " % self.question


class Answer(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name='answers')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    answered_date = models.DateField(auto_now_add=True)

    def get_question(self):
        ques_dict = vars(self.question)
        return {"question" : ques_dict["question"],
            "pub_date" : ques_dict["pub_date"],
            "description" : ques_dict["description"],
            }

    def get_user(self):
        user_dict = vars(self.user)
        return {"username": user_dict["username"]}
    
    def __str__(self):
        return "%s" % self.content


class Follow(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user')
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='follower')

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
        return Follow.objects.filter(follower=user).count()

    def get_followers_count(self, user):
        return Follow.objects.filter(user=user).count()

    def __str__(self):
        return str(self.id)


class Comment(models.Model):
    comment = models.TextField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments")
    answer = models.ForeignKey(
        Answer, on_delete=models.CASCADE, related_name="comments")
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return self.comment
