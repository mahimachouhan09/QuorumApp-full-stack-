from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_auth.registration.serializers import RegisterSerializer

# class ProfileSerializer(serializers.ModelSerializer):

#     user = serializers.StringRelatedField(read_only=True)
#     username = serializers.CharField(source='get_username')
#     user_id = serializers.IntegerField(source='get_user_id')
#     followers_count = serializers.IntegerField(source='get_followers_count')
#     following_count = serializers.IntegerField(source='get_following_count')
#     profile_belongs_to_authenticated_user = serializers.BooleanField(source='get_profile_belongs_to_authenticated_user')
#     follow_status = serializers.CharField(source='get_follow_status')

#     class Meta:
#         model = Profile
#         fields = "__all__"

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False, max_length=2)
    last_name = serializers.CharField(required=False, max_length=2)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        return data_dict