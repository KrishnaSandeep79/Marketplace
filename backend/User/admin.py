from django.contrib import admin
from .models import Name, ContactDetails, Address, UserDetails, UniversityInfo, Stream

# Register your models here.
admin.site.register(Name)
admin.site.register(UniversityInfo)
admin.site.register(Stream)
admin.site.register(ContactDetails)
admin.site.register(Address)
admin.site.register(UserDetails)