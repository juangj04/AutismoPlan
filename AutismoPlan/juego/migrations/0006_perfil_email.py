# Generated by Django 5.0.6 on 2024-07-05 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('juego', '0005_perfil'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfil',
            name='email',
            field=models.EmailField(default=1, max_length=254),
            preserve_default=False,
        ),
    ]
