#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config"
php artisan config:cache

echo "Caching routes"
php artisan route:cache

echo "Status conection DB"
php artisan migrate:status


