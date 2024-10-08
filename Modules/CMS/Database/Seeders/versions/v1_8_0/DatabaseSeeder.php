<?php

namespace Modules\CMS\Database\Seeders\versions\v1_8_0;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call([
            MenuItemsTableSeeder::class,
        ]);
    }
}
