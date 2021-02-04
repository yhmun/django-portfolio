from django.test import TestCase
from django.urls import reverse 

class UnitTestCase(TestCase):
    
    def test_index_template(self):
        response = self.client.get(reverse('hashing:index'))
        self.assertTemplateUsed(response, 'example/hashing/index.html')
