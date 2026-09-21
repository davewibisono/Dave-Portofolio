from django.shortcuts import render
from home.models import ProductPage

def search(request):
    search_query = request.GET.get('query', None)
    if search_query:
        # Mencari di semua ProductPage yang aktif
        search_results = ProductPage.objects.live().filter(title__icontains=search_query)
    else:
        search_results = ProductPage.objects.none()
    
    return render(request, 'search/search.html', {
        'search_query': search_query,
        'search_results': search_results,
    })