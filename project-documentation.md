##API Endpoints

Malmobos
Get All Malmobos

GET /api/malmobos
Get Malmobo by ID

GET /api/malmobos/:id
Create a New Malmobo

POST /api/malmobos
Body:
json

{
"name": "string",
"nickname": "string"
}
Update a Malmobo

PUT /api/malmobos/:id
Body:
json

{
"name": "string",
"nickname": "string"
}
Delete a Malmobo

DELETE /api/malmobos/:id
Posts
Get All Posts

GET /api/posts
Get Post by ID

GET /api/posts/:id
Create a New Post

POST /api/posts
Body:
json

{
"title": "string",
"content": "string",
"malmobo_id": 1,
"created_at": "2024-08-23T10:00:00Z"
}
Update a Post

PUT /api/posts/:id
Body:
json

{
"title": "string",
"content": "string",
"malmobo_id": 1,
"created_at": "2024-08-23T10:00:00Z"
}
Delete a Post

DELETE /api/posts/:id
