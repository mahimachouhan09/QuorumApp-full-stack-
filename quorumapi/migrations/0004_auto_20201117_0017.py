# Generated by Django 2.2.16 on 2020-11-17 00:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quorumapi', '0003_auto_20201030_1043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='contact_number',
            field=models.CharField(max_length=13),
        ),
    ]
