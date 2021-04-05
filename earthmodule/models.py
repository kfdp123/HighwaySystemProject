from django.db import models

# Create your models here.
class UserInfo(models.Model):
    user = models.CharField(max_length=32)
    pwd = models.CharField(max_length=32)

class PointRecord(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    point_name = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longtitude = models.FloatField(blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'point_record'
