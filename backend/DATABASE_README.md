# Thrive360 Database Structure

## Overview
This document describes the database structure for the Thrive360 application, including Freedom Wall posts and Challenges functionality.

## Database Tables

### 1. freedom_wall_posts
Stores posts from the Freedom Wall feature.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| content | text | Post content |
| author | string | Author name (default: 'Anonymous') |
| image_path | string | Path to uploaded image (nullable) |
| likes | integer | Number of likes (default: 0) |
| shares | integer | Number of shares (default: 0) |
| is_guest_post | boolean | Whether post was made by guest user |
| user_id | bigint | Foreign key to users table (nullable) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### 2. challenges
Stores wellness challenges.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| title | string | Challenge title |
| description | text | Challenge description |
| type | enum | Challenge type (Daily, Weekly, Monthly) |
| status | enum | Challenge status (Not Started, Progress, Completed) |
| days_left | integer | Days remaining (nullable) |
| participants | integer | Number of participants (default: 0) |
| progress_percentage | integer | Overall progress percentage (nullable) |
| start_date | date | Challenge start date (nullable) |
| end_date | date | Challenge end date (nullable) |
| theme | string | UI theme color (default: 'blue') |
| is_active | boolean | Whether challenge is active (default: true) |
| user_id | bigint | Foreign key to users table (nullable) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

### 3. user_challenge_progress
Tracks individual user progress on challenges.

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| user_id | bigint | Foreign key to users table |
| challenge_id | bigint | Foreign key to challenges table |
| progress_percentage | integer | User's progress (0-100) |
| status | enum | User's status (Not Started, Progress, Completed) |
| started_at | date | When user started challenge (nullable) |
| completed_at | date | When user completed challenge (nullable) |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

## API Endpoints

### Freedom Wall

#### Public Endpoints
- `GET /api/freedom-wall/posts` - Get all posts
- `POST /api/freedom-wall/posts` - Create new post (guests allowed)
- `POST /api/freedom-wall/posts/{id}/like` - Like a post
- `POST /api/freedom-wall/posts/{id}/share` - Share a post

#### Protected Endpoints (Requires Authentication)
- `DELETE /api/freedom-wall/posts/{id}` - Delete post (owner only)

### Challenges

#### Public Endpoints
- `GET /api/challenges` - Get all active challenges
- `GET /api/challenges/{id}` - Get specific challenge

#### Protected Endpoints (Requires Authentication)
- `POST /api/challenges` - Create new challenge
- `PUT /api/challenges/{id}` - Update challenge (owner only)
- `DELETE /api/challenges/{id}` - Delete challenge (owner only)
- `POST /api/challenges/{id}/join` - Join a challenge
- `POST /api/challenges/{id}/progress` - Update progress
- `GET /api/challenges/{id}/progress` - Get user's progress

## Setup Instructions

1. Run migrations:
```bash
php artisan migrate
```

2. Seed sample data:
```bash
php artisan db:seed
```

3. Or run both:
```bash
bash setup-database.sh
```

## Sample Data

The database includes sample data for:
- 5 Freedom Wall posts (mix of guest and user posts)
- 5 Wellness challenges (different types and themes)

## Features

### Freedom Wall
- Anonymous posting (guests can post)
- Image upload support
- Like and share functionality
- Guest posts are blurred for non-logged-in users
- Post deletion (owner only)

### Challenges
- Multiple challenge types (Daily, Weekly, Monthly)
- User progress tracking
- Participant counting
- Challenge management (CRUD operations)
- Progress percentage tracking
- Start/completion date tracking

## Security Notes

- Guest users can post on Freedom Wall but cannot delete posts
- Challenge creation/editing requires authentication
- User progress is private to each user
- Image uploads are stored in public storage
- All endpoints include proper validation
