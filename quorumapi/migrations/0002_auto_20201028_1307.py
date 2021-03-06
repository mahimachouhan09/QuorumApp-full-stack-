# Generated by Django 2.2.16 on 2020-10-28 13:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quorumapi', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='topics',
        ),
        migrations.RemoveField(
            model_name='question',
            name='topic',
        ),
        migrations.AlterField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='quorumapi.Question'),
        ),
        migrations.DeleteModel(
            name='Topic',
        ),
    ]
