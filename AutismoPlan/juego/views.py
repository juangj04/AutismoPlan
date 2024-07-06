from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from .models import Resultado, Perfil
from django.http import JsonResponse
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.files.storage import default_storage
class ResultadoListView(LoginRequiredMixin, ListView):
    model = Resultado
    template_name = 'juego/juego.html'
    paginate_by = 8
    context_object_name = 'resultados'

    def get_queryset(self):
        filtro = self.request.GET.get('filtro', 'todos')
        queryset = Resultado.objects.filter(usu=self.request.user)

        if filtro == 'ganados':
            queryset = queryset.filter(estado_resul__icontains='Ganaste!')
        elif filtro == 'perdidos':
            queryset = queryset.exclude(estado_resul__icontains='Ganaste!')

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['perfil'] = Perfil.objects.get(usu=self.request.user)
        context['filtro_actual'] = self.request.GET.get('filtro', 'todos')
        return context

def registro(request):
    return render(request, "juego/secregistro.html")

def registrar(request):
    if request.method == 'GET':
        return render(request, 'secregistro.html')
    else:
            try:
                user = User.objects.create_user(
                    request.POST["username"], password=request.POST["password"])
                user.save()
                login(request, user)
                return redirect('resultados')
            except IntegrityError:
                return render(request, 'juego/secregistro.html', {"error": "Usuario ya existe"})

def signin(request):
       


        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'registration/login.html', {"error": "Username or password is incorrect."})

        login(request, user)
        return redirect('resultados')
 
 
@login_required    
def signout(request):
    logout(request)
    return redirect('home')
    


def GuardarResultado(request):
    if request.method == 'POST':
        try:
            puntu_resul = int(request.POST['puntuacion']) 
            estado = request.POST['estado']
            
           
            if puntu_resul > 0:
                usu = request.user
                resultado = Resultado.objects.create(usu=usu, puntu_resul=puntu_resul, estado_resul=estado)
                return JsonResponse({'status': 'success', 'message': 'Guardado correctamente'})
            else:
                return JsonResponse({'status': 'error', 'message': 'La puntuación debe ser mayor que 0'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Error: '})

   
    return redirect('juego')


def agregardetalles(request):
    return render(request, "juego/agregardetalles.html")




def guardardetalles(request):
    perfil_existente = Perfil.objects.filter(usu=request.user).first()

    if request.method == 'POST':
        foto_perfil = request.FILES.get('txtfoto')
        comida_favorita = request.POST.get('txtcomida')
        hobby = request.POST.get('txthobby')
        email = request.POST.get('txtemail')

        if perfil_existente:
           
            perfil_existente.fotoPerfil = foto_perfil or perfil_existente.fotoPerfil
            perfil_existente.comidaFavorita = comida_favorita
            perfil_existente.hobby = hobby
            perfil_existente.emailPerfil = email
            perfil_existente.save()
        else:
           
            perfil_nuevo = Perfil.objects.create(
                fotoPerfil=foto_perfil,
                comidaFavorita=comida_favorita,
                hobby=hobby,
                emailPerfil=email,
                usu=request.user
            )

        return redirect('/juego/')
    
    # Renderiza el formulario con el perfil existente si lo hay
    return render(request, 'juego/agregardetalles.html', {'perfil_existente': perfil_existente})



