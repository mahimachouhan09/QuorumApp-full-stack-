# Generated by Django 2.2.16 on 2020-12-03 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quorumapi', '0005_delete_activity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='pub_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
