import hashlib
from django.test import TestCase
from django.urls import reverse 
from django.core.exceptions import ValidationError
from .forms import HashForm
from .models import Hash

class UnitTestCase(TestCase):
    
    def test_index_template(self):
        url = reverse('hashing:index')
        response = self.client.get(url)
        self.assertTemplateUsed(response, 'example/hashing/index.html')

    def test_hash_form(self):
        form = HashForm(data={'text':'hello'})
        self.assertTrue(form.is_valid())

    def test_hash_lib(self):
        text_hash = hashlib.sha256('hello'.encode('utf-8')).hexdigest()
        self.assertEqual('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824', text_hash)

    def save_hash(self):
        hash = Hash()
        hash.text = 'hello'
        hash.hash = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
        hash.save()
        return hash

    def test_hash_object(self):
        hash = self.save_hash()
        pulled_hash = Hash.objects.get(hash=hash.hash)
        self.assertEqual(hash.text, pulled_hash.text)

    def test_viewing_hash(self):
        hash = self.save_hash()
        url = reverse('hashing:hash', kwargs={'hash': hash.hash})
        response = self.client.get(url)
        self.assertContains(response, 'hello')

    def test_bad_data(self):
        def bad_hash():
            hash = Hash()
            hash.hash = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824ggggg'
            hash.full_clean()
        self.assertRaises(ValidationError, bad_hash)
