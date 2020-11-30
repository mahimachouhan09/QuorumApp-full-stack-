from datetime import date

from rest_framework import serializers

from .models import Answer, Comment, Follow, Profile, Question


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('id', 'user', )


class AnswerSerializer(serializers.ModelSerializer):
    comments_count = serializers.SerializerMethodField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    username = serializers.CharField(
        source='get_user', read_only=True)

    class Meta:
        model = Answer
        fields = (
            'id',
            'question', 'user', 'content', 'answered_date',
            'comments_count', 'username',
            'comments',
            )
        read_only_fields = ('id', 'user', 'answered_date',)

    def get_comments_count(self, obj):
        return obj.comments.count()


class QuestionSerializer(serializers.ModelSerializer):
    answers_count = serializers.SerializerMethodField(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    asked_by = serializers.CharField(
        source='get_user', read_only=True)

    class Meta:
        model = Question
        fields = (
            'id',
            'user', 'asked_by',
            'question', 'pub_date',
            'description', 'answers_count',
            'answers',
            )
        read_only_fields = (
            'id', 'user', 'asked_by', 'pub_date',
            )

    def get_answers_count(self, obj):
        return obj.answers.count()


class ProfileSerializer(serializers.ModelSerializer):
    dob = serializers.DateField()
    contact_number = serializers.CharField()
    username = serializers.CharField(
        source='get_username', read_only=True)
    first_name = serializers.CharField(
        source='get_first_name', read_only=True)
    last_name = serializers.CharField(
        source='get_last_name', read_only=True)
    user_id = serializers.IntegerField(
        source='get_user_id', read_only=True)
    followers_count = serializers.IntegerField(
        source='get_followers_count', read_only=True)
    following_count = serializers.IntegerField(
        source='get_following_count', read_only=True)
    profile_belongs_to_authenticated_user = serializers.BooleanField(
        source='get_profile_belongs_to_authenticated_user',
        read_only=True
        )
    follow_status = serializers.CharField(
        source='get_follow_status', read_only=True)

    class Meta:
        model = Profile
        fields = (
            'id', 'username', 'first_name',
            'last_name', 'dob', 'profile_pic',
            'gender', 'contact_number',
            'user_id', 'followers_count', 'following_count',
            'profile_belongs_to_authenticated_user', 'follow_status',
            )
        read_only_fields = (
            'id', 'user_id', 'username',
            'followers_count', 'following_count',
            'profile_belongs_to_authenticated_user', 'follow_status',
            )

    def validate_dob(self, dob):
        today = date.today()
        age = today.year - dob.year - (
            (today.month, today.day) < (dob.month, dob.day))
        if (age < 8):
            raise serializers.ValidationError("You are no eligible.")
        return dob

    def validate_contact_number(self, contact_number):
        if len(contact_number) != 13:
            raise serializers.ValidationError(
                'Length of phone number must be 10 digits and country code')
        return contact_number


class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(
        child=serializers.CharField(),
        source='get_user_info', read_only=True)
    follower = serializers.DictField(
        child=serializers.CharField(),
        source='get_follower_info', read_only=True)

    class Meta:
        model = Follow
        fields = ('id', 'user', 'follower')
        read_only_fields = ('id', 'user', 'follower',)
