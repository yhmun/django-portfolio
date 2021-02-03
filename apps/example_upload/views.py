from django.shortcuts import render
from django.core.files.storage import FileSystemStorage

def file_upload(request):
    if request.method == "POST" and request.FILES["file"]:
        fs = FileSystemStorage()
        file = request.FILES["file"]
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)
        print(file_url)
        return render(request, "example/upload.html", {
            "file_url": file_url
            })
    return render(request, "example/upload.html")
