from datetime import date

<<<<<<< HEAD
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
=======
from django.contrib.auth.models import User
from django.db import transaction
from generic_relations.relations import GenericRelatedField
from rest_framework import exceptions, serializers

from .models import Activity, Answer, Comment, Follow, Profile, Question, Topic


class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('user', 'answer',)
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e


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
<<<<<<< HEAD
            'id',
            'question', 'user', 'content', 'answered_date',
            'likes_count', 'dislikes_count', 'comments_count',
            'comments',
            )
        read_only_fields = ('id', 'user', 'answered_date',)
=======
            'question', 'user', 'content', 'answered_date',
            'likes_count', 'dislikes_count', 'comments_count',
            'comments')
        read_only_fields = ('user', 'answered_date',)
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

    def get_comments_count(self, obj):
        return obj.comments.count()


class QuestionSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(
        source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(
        source='down_vote_count', read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
<<<<<<< HEAD
=======
    topic_id = serializers.PrimaryKeyRelatedField(
        queryset=Topic.objects.all(), write_only=True, many=True)
    topic = TopicSerializer(many=True, read_only=True)
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

    class Meta:
        model = Question
        fields = (
<<<<<<< HEAD
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
=======
            'user', "topic_id",
            'question', 'pub_date', 'topic',
            'description', 'likes_count',
            'dislikes_count', 'answers', "topic")
        read_only_fields = ('user', 'pub_date',)

    @transaction.atomic()
    def create(self, validated_data):
        topics = validated_data.pop("topic_id")
        validated_data['user'] = self.context['request'].user
        quetions = self.Meta.model.objects.create(**validated_data)

        if topics:
            quetions.topic.clear()
        for topic in topics:
            quetions.topic.add(topic)
        quetions.save()
        return quetions


class ProfileSerializer(serializers.ModelSerializer):
    topics_id = serializers.PrimaryKeyRelatedField(
        queryset=Topic.objects.all(), write_only=True, many=True)
    topics = TopicSerializer(many=True, read_only=True)
    dob = serializers.DateField()
    contact_number = serializers.CharField()
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

    class Meta:
        model = Profile
        fields = (
<<<<<<< HEAD
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
=======
            'gender', 'contact_number',
            'profile_pic', 'topics', 'dob', "topics_id")
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e

    def validate_dob(self, dob):
        today = date.today()
        age = today.year - dob.year - (
            (today.month, today.day) < (dob.month, dob.day))
        if (age < 8):
            raise serializers.ValidationError("You are no eligible.")
        return dob

    def validate_contact_number(self, contact_number):
<<<<<<< HEAD
        if len(contact_number) != 13:
            raise serializers.ValidationError(
                'Length of phone number must be 10 digits and country code')
        return contact_number


=======
        if not contact_number.isdigit():
            raise serializers.ValidationError(
                'Phone number can only contains digits')
        if len(contact_number) != 10:
            raise serializers.ValidationError(
                'Length of phone number must be 10 digits')
        return contact_number


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    # password = serializers.CharField()

    class Meta:
        model = User
        fields = ('profile', 'first_name', 'last_name', 'username', 'password')

    @transaction.atomic()
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            )
        user.set_password(validated_data.get('password'))
        user.save()

        profile_data = validated_data.pop('profile')
        profile_data['user'] = user

        profile_serializer = ProfileSerializer(data=profile_data)
        if profile_serializer.is_valid():
            profile = profile_serializer.save()
        else:
            raise exceptions.ValidationError(profile_serializer.errors)

        if "topics_id" in profile_data and profile_data['topics_id']:
            profile.topics.clear()

        for topic in profile_data['topics_id']:
            profile.topics.add(topic)

        profile.save()
        return user

    @transaction.atomic()
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile_obj = instance.profile
        profile_obj.gender = profile_data.get(
            "gender", profile_obj.gender)
        profile_obj.dob = profile_data.get("dob", profile_obj.dob)
        profile_obj.contact_number = profile_data.get(
            "contact_number", profile_obj.contact_number)
        profile_obj.profile_pic = profile_data.get(
            "profile_pic", profile_obj.profile_pic)

        if "topics_id" in profile_data and profile_data['topics_id']:
            profile_obj.topics.clear()
        for topic in profile_data['topics_id']:
            profile_obj.topics.add(topic)

        profile_obj.save()
        instance = super(UserSerializer, self).update(instance, validated_data)
        return instance


class ActivitySerializerRelatedField(serializers.ModelSerializer):

    act_object = GenericRelatedField({
        Question: QuestionSerializer(),
        Answer: AnswerSerializer()
    })

    class Meta:
        model = Activity
        fields = (
            'user', 'object_id', 'content_type',
            'activity_type', 'date', 'act_object')
        read_only_fields = ('user',)

    def to_representation(self, value):
        if isinstance(value, Question):
            serializer = QuestionSerializer(value)
        elif isinstance(value, Answer):
            serializer = AnswerSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')
        return serializer.data


>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(
        child=serializers.CharField(),
        source='get_user_info', read_only=True)
    follower = serializers.DictField(
        child=serializers.CharField(),
        source='get_follower_info', read_only=True)

    class Meta:
        model = Follow
<<<<<<< HEAD
        fields = ('id', 'user', 'follower')
        read_only_fields = ('id', 'user', 'follower',)
=======
        fields = ('user', 'follower')
        read_only_fields = ('user', 'follower',)
>>>>>>> a26299efc64c6acbc3e4f6dcb39f446dee7cc00e
