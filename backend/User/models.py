from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class TimestampModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Name(TimestampModel):
    first_name = models.CharField(max_length=25, null=False)
    middle_name = models.CharField(max_length=25, default='none')
    last_name = models.CharField(max_length=25, null=False)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "middle_name": self.middle_name,
            "last_name": self.last_name
        }


class ContactDetails(TimestampModel):
    phone1 = models.CharField(max_length=10, null=False)
    phone2 = models.CharField(max_length=10, default='none')
    landline = models.CharField(max_length=10, default='none')
    email = models.EmailField(null=False)

    def __str__(self):
        return self.email

    def serialize(self):
        return {
            "id": self.id,
            "phone1": self.phone1,
            "phone2": self.phone2,
            "landline": self.landline,
            "email": self.email
        }


class Address(TimestampModel):
    address_line1 = models.CharField(max_length=30, default='none')
    address_line2 = models.CharField(max_length=30, default='none')
    country = models.CharField(max_length=20, null=False)
    state = models.CharField(max_length=20, null=False)
    city = models.CharField(max_length=20, null=False)
    zipcode = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.country + " " + self.state + " " + self.city + " " + self.zipcode

    def serialize(self):
        return {
            "id": self.id,
            "address_line1": self.address_line1,
            "address_line2": self.address_line2,
            "country": self.country,
            "state": self.state,
            "city": self.city,
            "zipcode": self.zipcode
        }


# class UserDetails(TimestampModel):
#     name_id = models.OneToOneField(Name, on_delete=models.CASCADE, null=False)
#     contact_id = models.OneToOneField(ContactDetails, on_delete=models.CASCADE, null=False)
#     address_id = models.OneToOneField(Address, on_delete=models.CASCADE, null=False)
#
#     def serialize(self):
#         return {
#             "id": self.id,
#             "name_id": self.name_id,
#             "contact_id": self.contact_id,
#             "address_id": self.address_id,
#         }
#
#     def __str__(self):
#         return "User Details" + " " + str(self.id)
class Stream(TimestampModel):
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name


class UniversityInfo(TimestampModel):
    name = models.CharField(max_length=30, null=False)
    branch = models.ForeignKey(Stream, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class UserDetails(TimestampModel):
    userInfo = models.OneToOneField(User, on_delete=models.CASCADE)
    university = models.OneToOneField(UniversityInfo, on_delete=models.DO_NOTHING, null=False)
    address_info = models.OneToOneField(Address, on_delete=models.DO_NOTHING)
    contact_info = models.OneToOneField(ContactDetails, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.userInfo.first_name
