from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel

class HomePage(Page):
    """Halaman utama yang akan menampilkan daftar produk"""
    body = RichTextField(blank=True)

    def get_context(self, request):
        context = super().get_context(request)
        # Mengambil semua ProductPage yang sudah di-publish
        context['products'] = ProductPage.objects.live().public()
        return context

    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]

class ProductPage(Page):
    """Halaman detail untuk tiap barang"""
    price = models.IntegerField(help_text="Harga dalam Rupiah (contoh: 50000)")
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    description = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('image'),
        FieldPanel('price'),
        FieldPanel('description'),
    ]

class CartPage(Page):
    """Halaman untuk menampilkan isi keranjang"""
    template = "home/cart_page.html"
    
    # Halaman ini biasanya hanya satu, jadi kita batasi
    max_count = 1 

    def get_context(self, request):
        context = super().get_context(request)
        return context

discount_percent = models.IntegerField(default=0, blank=True)
rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)