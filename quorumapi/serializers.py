from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer


class ProfileSerializer(serializers.ModelSerializer):
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
            # first_name = profile_data['first_name'],
        )
        profile.save()
        return user
    
    def update(self,instance, validated_data):
        profile_data = validated_data.pop('profile')
        instance = super(UserSerializer, self).update(instance, validated_data)
        return instance
