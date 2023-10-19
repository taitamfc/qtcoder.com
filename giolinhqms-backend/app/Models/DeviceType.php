<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeviceType extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "device_types";
    protected $fillable = [
        'name',
    ];
    public function devices()
    {
        return $this->hasMany(Device::class);
    }
}
