from django.test import TestCase
from django.urls import reverse 
from .forms import HashForm

class UnitTestCase(TestCase):
    
    def test_index_template(self):
        response = self.client.get(reverse('hashing:index'))
        self.assertTemplateUsed(response, 'example/hashing/index.html')

    def test_hash_form(self):
        form = HashForm(data={'text':'hello'})
        self.assertTrue(form.is_valid())
