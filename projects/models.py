from django.db import models
from django.conf import settings

class Project(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    description = models.TextField()
    framework = models.CharField(max_length=64)
    image = models.ImageField(upload_to='projects/')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Project(id={self.id}, title={self.title}, description={self.description}, framework={self.framework}, image={self.framework})"