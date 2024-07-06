from django.contrib import admin


# Register your models here.
from .models import Resultado




class ResultadoAdmin(admin.ModelAdmin):
    readonly_fields = ['fecha_resul']
    list_display=("estado_resul", "puntu_resul", "usu")
    




admin.site.register(Resultado,ResultadoAdmin)

