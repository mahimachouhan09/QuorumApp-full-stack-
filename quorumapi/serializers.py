from rest_framework import serializers
from .models import Activity, Comment, Profile, Topic, Question, Answer, Follow
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
        profile_data = validated_data.pop('profile')
        profile_obj = instance.profile
        profile_obj.gender = profile_data.get("gender", profile_obj.gender)
        profile_obj.dob = profile_data.get("dob", profile_obj.dob)
        profile_obj.profile_pic = profile_data.get("profile_pic", profile_obj.profile_pic)
        profile_obj.save()
        instance = super(UserSerializer, self).update(instance, validated_data)
        return instance
    
    # def validated(self,data):


class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'


class AnswerSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(source='down_vote_count', read_only=True)
    # comments_count = serializers.IntegerField(source='get_comments_count', read_only=True)
    comments = CommentSerializer(many=True)

    class Meta:
        model = Answer
        fields = ('question','user','content','answered_date','likes_count','dislikes_count','comments')
        read_only_fields = ('user','answered_date',)


class QuestionSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='up_vote_count', read_only=True)
    dislikes_count = serializers.IntegerField(source='down_vote_count', read_only=True)
    # vote = ActivitySerializerRelatedField(many=True)
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ('user',
            'question','pub_date','topic','description','likes_count','dislikes_count','answers',)
        read_only_fields = ('user','pub_date',)
        write_only_fields = ('question','topic',)


class ActivitySerializerRelatedField(serializers.ModelSerializer):
    # generic_data = GenericField(source='content_object', read_only=True)
    ques_obj = QuestionSerializer(source='question',required=False)
    ans_obj = AnswerSerializer(source='answer',required=False)

    act_object = GenericRelatedField({
        Question: QuestionSerializer(),
        Answer: AnswerSerializer()
    })
    

    class Meta:
        model = Activity
        fields = ('user','object_id','content_type','activity_type','date','act_object','ques_obj','ans_obj')
        read_only_fields =('user')

    
    def to_representation(self, value):
        if isinstance(value, Question):
            serializer = QuestionSerializer(value)
        elif isinstance(value, Answer):
            serializer = AnswerSerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')

        return serializer.data

class FollowerSerializer(serializers.ModelSerializer):
    user = serializers.DictField(child = serializers.CharField(), source = 'get_user_info', read_only = True)
    follower = serializers.DictField(child = serializers.CharField(), source = 'get_follower_info', read_only = True)

    class Meta:
        model = Follow
        fields = ('user', 'follower')
        read_only_fields = ('user', 'follower')
