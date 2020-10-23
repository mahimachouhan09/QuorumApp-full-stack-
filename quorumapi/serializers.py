from datetime import date

from django.contrib.auth.models import User
from django.db import transaction
from generic_relations.relations import GenericRelatedField
from rest_framework import exceptions, serializers

from .models import Activity, Answer, Comment, Follow, Profile, Question, Topic


class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'
        read_only_fields = ('id',)


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
    vote = ActivitySerializerRelatedField(many=True, required=False)
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
            'vote',
            )
        read_only_fields = ('id', 'user', 'answered_date',)

    def get_comments_count(self, obj):
        return obj.comments.count()


class QuestionSerializer(serializers.ModelSerializer):
    vote = ActivitySerializerRelatedField(many=True, required=False)
    likes_count = serializers.IntegerField(
        source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(
        source='down_vote_count', read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    topic_id = serializers.PrimaryKeyRelatedField(
        queryset=Topic.objects.all(), write_only=True, many=True)
    topic = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            'id',
            'user', "topic_id",
            'question', 'pub_date', 'topic',
            'description', 'likes_count',
            'dislikes_count', 'answers',
            'topic',
            'vote',
            )
        read_only_fields = ('id', 'user', 'pub_date',)

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
    # topics_id = serializers.PrimaryKeyRelatedField(
    #     queryset=Topic.objects.all(),write_only=True, many=True)
    topics_id = serializers.SlugRelatedField(
        queryset=Topic.objects.all(),
        write_only=True, many=True, slug_field='name')
    topics = TopicSerializer(many=True, read_only=True)
    dob = serializers.DateField()
    contact_number = serializers.CharField()

    class Meta:
        model = Profile
        fields = (
            'id',
            'gender', 'contact_number',
            'profile_pic',
            'topics',
            'dob',
            'topics_id',
            )
        read_only_fields = ('id', 'topics',)

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


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    # password = serializers.CharField()

    class Meta:
        model = User
        fields = (
            'id', 'profile', 'first_name',
            'last_name', 'username', 'password',)
        read_only_fields = ('id',)

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

        data = profile_data

        profile_serializer = ProfileSerializer(data=data)
        if profile_serializer.is_valid():
            profile = profile_serializer.save()
        else:
            raise exceptions.ValidationError(profile_serializer.errors)

        if 'topics_id' in profile_data and profile_data['topics_id']:
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
