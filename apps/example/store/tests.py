from rest_framework.test import APITestCase
from django.urls import reverse 
from .models import Product

class ProductCreateTestCase(APITestCase):
    def test_create_product(self):
        Product.objects.all().delete()
        initial_product_count = Product.objects.count()
        print(initial_product_count)
        product_attrs = {
            'name': 'New Product',
            'description': 'Awesome product',
            'price': '123.45',
        }
        response = self.client.post(reverse('store:api_products')+'create', product_attrs)
        if response.status_code != 201:
            print(response.data)
        self.assertEqual(Product.objects.count(), initial_product_count+1)
        for attr, expected_value in product_attrs.items():
            self.assertEqual(response.data[attr], expected_value)
        self.assertEqual(response.data['is_on_sale'], False)
        self.assertEqual(response.data['current_price'], float(product_attrs['price']))

class ProductDestoryTestCase(APITestCase):
    def test_delete_product(self):
        initial_product_count = Product.objects.count()
        product_id = Product.objects.first().id 
        print(reverse('store:api_products')+'{}/'.format(product_id))
        self.client.delete(reverse('store:api_products')+'{}/'.format(product_id))
        self.assertEqual(Product.objects.count(), initial_product_count-1)
        self.assertRaises(
            Product.DoesNotExist,
            Product.objects.get, id=product_id,
        )