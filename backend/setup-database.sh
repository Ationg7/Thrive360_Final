#!/bin/bash

echo "Setting up Thrive360 database..."

# Run migrations
echo "Running migrations..."
php artisan migrate

# Run seeders
echo "Running seeders..."
php artisan db:seed

echo "Database setup complete!"
echo "You can now test the API endpoints:"
echo "- GET /api/freedom-wall/posts"
echo "- POST /api/freedom-wall/posts"
echo "- GET /api/challenges"
echo "- POST /api/challenges (requires auth)"
