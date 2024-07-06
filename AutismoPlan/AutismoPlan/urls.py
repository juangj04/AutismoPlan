

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from core import views as core_views
from juego import views as juego_views
from juego.views import ResultadoListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('agregardetalles/', juego_views.agregardetalles),
    path('guardardetalles/', juego_views.guardardetalles),
    path('juego/', ResultadoListView.as_view(), name='resultados'),
    path('creditos/',core_views.creditos),
    # path('juego/',juego_views.juego, name='juego'),
    path('acercade/',core_views.acercade),
    path('', core_views.home, name='home'),
    path('registro/', juego_views.registro),
    path('signin/', juego_views.signin, name='signin'),
    path('registrar/', juego_views.registrar, name='registrar'),
    path('signout/', juego_views.signout, name='signout'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('GuardarResultado/', juego_views.GuardarResultado, name='guardarResultado'),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

