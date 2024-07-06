from django.db import models
from django.contrib.auth.models import User
from django.db import models


class Resultado(models.Model):

    fecha_resul = models.DateTimeField(auto_now=True)
    estado_resul = models.CharField(max_length=20)
    puntu_resul = models.IntegerField()
    usu = models.ForeignKey(User, on_delete=models.CASCADE )
    

    def __str__(self):
        texto="{0}"
        return texto.format(self.idResultado, self.estado_resul)




class Perfil(models.Model):

    fotoPerfil = models.ImageField(upload_to="imagenes/")
    comidaFavorita = models.CharField(max_length=50)
    hobby = models.TextField()
    emailPerfil = models.EmailField()
    usu = models.ForeignKey(User, on_delete=models.CASCADE)
