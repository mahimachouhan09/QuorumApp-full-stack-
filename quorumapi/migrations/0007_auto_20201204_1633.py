# Generated by Django 2.2.16 on 2020-12-04 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quorumapi', '0006_auto_20201203_1719'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='num_vote_down',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='answer',
            name='num_vote_up',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='answer',
            name='vote_score',
            field=models.IntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='comment',
            name='num_vote_down',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='comment',
            name='num_vote_up',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='comment',
            name='vote_score',
            field=models.IntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='question',
            name='num_vote_down',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='question',
            name='num_vote_up',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='question',
            name='vote_score',
            field=models.IntegerField(db_index=True, default=0),
        ),
    ]