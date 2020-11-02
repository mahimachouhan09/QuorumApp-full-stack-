from datetime import date

from generic_relations.relations import GenericRelatedField
from rest_framework import serializers

from .models import Activity, Answer, Comment, Follow, Profile, Question


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('id', 'user', )


class ActivitySerializerRelatedField(serializers.ModelSerializer):
    act_object = GenericRelatedField({
        Question: serializers.HyperlinkedRelatedField(
            queryset=Question.objects.all(),
            view_name='QuestionViewSet',
        ),

        Answer: serializers.HyperlinkedRelatedField(
            queryset=Answer.objects.all(),
            view_name='AnswerViewSet',
        ),
    })

    class Meta:
        model = Activity
        fields = (
            'id',
            'user', 'object_id', 'content_type',
            'activity_type', 'date', 'act_object', 'content_object')
        read_only_fields = ('id', 'user',)

    def to_representation(self, value):
        if isinstance(value, Question):
            serializer = QuestionSerializer(value)
        elif isinstance(value, Answer):
            serializer = AnswerSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')
        return serializer.data


class AnswerSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(
        source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(
        source='down_vote_count', read_only=True)
    comments_count = serializers.SerializerMethodField(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = (
            'id',
            'question', 'user', 'content', 'answered_date',
            'likes_count', 'dislikes_count', 'comments_count',
            'comments',
            )
        read_only_fields = ('id', 'user', 'answered_date',)

    def get_comments_count(self, obj):
        return obj.comments.count()


class QuestionSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(
        source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(
        source='down_vote_count', read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            'id',
            'user',
            'question', 'pub_date',
            'description', 'likes_count',
            'dislikes_count', 'answers',
            )
        read_only_fields = (
            'id', 'user', 'pub_date',
            )


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
        if not contact_number.isdigit():
            raise serializers.ValidationError(
                'Phone number can only contains digits')
        if len(contact_number) != 10:
            raise serializers.ValidationError(
                'Length of phone number must be 10 digits')
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
