#!/usr/bin/env bash

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config"
php artisan config:cache

echo "Caching routes"
php artisan route:cache

echo "Location SSL Cert"
php -r "echo openssl_get_cert_locations()['default_cert_file'];"



