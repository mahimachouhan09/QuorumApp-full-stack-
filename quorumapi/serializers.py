from datetime import date

from rest_framework import serializers

from .models import (Answer, AnswerVote, Comment, CommentVote, Follow, Profile,
                     Question, QuestionVote)


class QuestionVoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = QuestionVote
        fields = '__all__'
        read_only_fields = ('id', 'user')


class CommentVoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentVote
        fields = '__all__'
        read_only_fields = ('id', 'user')


class AnswerVoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnswerVote
        fields = '__all__'
        read_only_fields = ('id', 'user')


class CommentSerializer(serializers.ModelSerializer):
    commented_date_time = serializers.CharField(
        source='get_date', read_only=True)
    commentlike = CommentVoteSerializer(many=True, read_only=True)
    like_count = serializers.SerializerMethodField(read_only=True)
    dislike_count = serializers.SerializerMethodField(read_only=True)

    def get_like_count(self, obj):
        return obj.commentlike.filter(like=True).count()

    def get_dislike_count(self, obj):
        return obj.commentlike.filter(like=False).count()

    class Meta:
        model = Comment
        fields = (
            'id', 'user', 'comment', 'answer', 'commented_date_time',
            'like_count', 'dislike_count', 'commentlike',)
        read_only_fields = ('id', 'user', 'commented_date_time',)


class AnswerSerializer(serializers.ModelSerializer):
    answered_date_time = serializers.CharField(
        source='get_date', read_only=True)
    comments_count = serializers.SerializerMethodField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    username = serializers.CharField(
        source='get_user', read_only=True)
    question_dict = serializers.CharField(
        source='get_question', read_only=True)
    answervote = AnswerVoteSerializer(many=True, read_only=True)
    answer_upvote_count = serializers.SerializerMethodField(read_only=True)
    answer_downvote_count = serializers.SerializerMethodField(read_only=True)

    def get_answer_upvote_count(self, obj):
        return obj.answervote.filter(vote=True).count()

    def get_answer_downvote_count(self, obj):
        return obj.answervote.filter(vote=False).count()

    class Meta:
        model = Answer
        fields = (
            'id', 'question_dict', 'answered_date_time',
            'question', 'user', 'content',
            'answer_upvote_count', 'answer_downvote_count', 'answervote',
            'comments_count', 'username', 'photo', 'comments',
            )
        read_only_fields = ('id', 'user', 'answered_date_time',)

    def get_comments_count(self, obj):
        return obj.comments.count()


class QuestionSerializer(serializers.ModelSerializer):
    answers_count = serializers.SerializerMethodField(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    asked_by = serializers.CharField(
        source='get_user', read_only=True)
    pub_date_time = serializers.CharField(source='get_date', read_only=True)
    vote = QuestionVoteSerializer(many=True, read_only=True)
    upvote_count = serializers.SerializerMethodField(read_only=True)
    downvote_count = serializers.SerializerMethodField(read_only=True)

    def get_upvote_count(self, obj):
        return obj.vote.filter(vote=True).count()

    def get_downvote_count(self, obj):
        return obj.vote.filter(vote=False).count()

    class Meta:
        model = Question
        fields = (
            'id', 'pub_date_time', 'user', 'asked_by',
            'question', 'description', 'answers_count',
            'answers', 'upvote_count', 'downvote_count', 'vote',
            'is_favorite',
            )
        read_only_fields = (
            'id', 'user', 'asked_by', 'pub_date_time', 'questionVote',
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
