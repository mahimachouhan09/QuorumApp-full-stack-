from rest_framework import serializers
from .models import Activity, Profile, Topic, Question, Answer, Follow
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer
from generic_relations.relations import GenericRelatedField

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = ('gender', 'contact_number','profile_pic','topics','dob')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('profile', 'first_name', 'last_name','username', 'password')
        # read_only_fields = ('password')
        # write_only_fields =('username',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            )
        user.set_password(validated_data.get('password'))
        user.save()
        
        profile_data = validated_data.pop('profile')
        profile = Profile.objects.create(
            user = user,
            gender = profile_data['gender'],
            contact_number = profile_data['contact_number'],
            profile_pic = profile_data['profile_pic'],
            dob = profile_data['dob'],
        )
        profile.save()
        return user
    
    def update(self,instance, validated_data):
        # profile_data = validated_data.pop('profile')
        instance = super(UserSerializer, self).update(instance, validated_data)
        return instance


class QuestionSerializer(serializers.ModelSerializer):
    # post_belongs_to_authenticated_user = serializers.BooleanField(source = 'get_post_belongs_to_authenticated_user', read_only = True)
    # user = serializers.DictField(child = serializers.CharField(), source = 'get_user', read_only = True)
    likes_count = serializers.IntegerField(source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(source='down_vote_count', read_only=True)
    # comments_count = serializers.IntegerField(source='get_comments_count', read_only=True)
    # vote = ActivitySerializerRelatedField(many=True)

    class Meta:
        model = Question
        fields = ('user',
            'question','pub_date','topic','description','likes_count','dislikes_count',)
        read_only_fields = ('user','pub_date',)
        write_only_fields = ('question','topic',)

class AnswerSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(source='down_vote_count', read_only=True)

    class Meta:
        model = Answer
        fields = ('question','user','content','answered_date','likes_count','dislikes_count',)

class ActivitySerializerRelatedField(serializers.RelatedField):
    # generic_data = GenericField(source='content_object', read_only=True)
    act_object = GenericRelatedField({
        Question: QuestionSerializer(),
        Answer: AnswerSerializer()
    })

    def to_representation(self, value):
        if isinstance(value, Question):
            serializer = QuestionSerializer(value)
        elif isinstance(value, Answer):
            serializer = AnswerSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')

        return serializer.data

    class Meta:
        model = Activity
        fields = ('user','question','object_id','content_type','activity_type','date','act_object',)

class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(child = serializers.CharField(), source = 'get_user_info', read_only = True)
    follower = serializers.DictField(child = serializers.CharField(), source = 'get_follower_info', read_only = True)

    class Meta:
        model = Follow
        fields = ('user', 'follower')
        read_only_fields = ('user', 'follower')
