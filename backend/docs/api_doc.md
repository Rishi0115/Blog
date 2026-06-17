# Blogging Portal API Documentation

Base URL: `http://localhost:8000/api/`

## Authentication

This API uses Token Authentication. After logging in, include the token in the `Authorization` header for any request that creates, updates, or deletes data:

---

## Endpoints

### 1. Login

**POST** `/api/auth/login/`

Authenticates a user and returns an auth token along with their role.

**Request body** (`x-www-form-urlencoded`):
| Field | Type | Required |
|---|---|---|
| username | string | Yes |
| password | string | Yes |

**Response** `200 OK`:
```json
{
  "token": "3187b013119a52aefec78cfc4008326fac33281b",
  "role": "user"
}
```

`role` is either `"user"` or `"admin"`.

---

### 2. List Posts

**GET** `/api/posts/`

Returns all blog posts. No authentication required.

**Query parameters (optional):**
| Param | Description | Example |
|---|---|---|
| category | Filter by category | `?category=Tech` |
| author | Filter by author ID | `?author=1` |
| is_published | Filter by published status | `?is_published=true` |
| search | Text search across title/content | `?search=django` |
| ordering | Sort results | `?ordering=-date` |
| page | Pagination page number | `?page=2` |

**Response** `200 OK`:
```json
{
  "count": 12,
  "next": "http://localhost:8000/api/posts/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Introduction",
      "content": "Hi! My name is...",
      "category": "AutoBiography",
      "author": 1,
      "date": "2026-06-10T12:58:29.705070Z",
      "excerpt": "",
      "is_published": true
    }
  ]
}
```

Note: response is paginated (5 posts per page). Use `results` array for the post list, `next`/`previous` for pagination controls.

---

### 3. Create Post

**POST** `/api/posts/`

Creates a new post. Requires authentication. `author` is automatically set to the logged-in user — do not send it.

**Headers:**

Authorization Token 187b013119a52aefec78cfc4008326fac33281b

**Request body** (`x-www-form-urlencoded`):
| Field | Type | Required |
|---|---|---|
| title | string | Yes |
| content | string | Yes |
| category | string | Yes |
| excerpt | string | No |
| is_published | boolean | No (defaults to false) |

**Response** `201 Created`:
```json
{
  "id": 5,
  "title": "Test Post",
  "content": "Some content here",
  "category": "Test",
  "author": 1,
  "date": "2026-06-17T10:00:00Z",
  "excerpt": "A short excerpt",
  "is_published": true
}
```

---

### 4. Retrieve Single Post

**GET** `/api/posts/{id}/`

Returns a single post by ID. No authentication required.

**Response** `200 OK`:
```json
{
  "id": 1,
  "title": "Introduction",
  "content": "Hi! My name is...",
  "category": "AutoBiography",
  "author": 1,
  "date": "2026-06-10T12:58:29.705070Z",
  "excerpt": "",
  "is_published": true
}
```

**Response** `404 Not Found` if the ID doesn't exist.

---

### 5. Update Post

**PUT / PATCH** `/api/posts/{id}/`

Updates a post. Only the post's author or an admin can perform this action.

**Headers:**
Authorization Token 187b013119a52aefec78cfc4008326fac33281b

**Request body** (`x-www-form-urlencoded`, any subset of fields for PATCH):
| Field | Type |
|---|---|
| title | string |
| content | string |
| category | string |
| excerpt | string |
| is_published | boolean |

**Response** `200 OK`: returns the updated post object.

**Response** `403 Forbidden` if the requester is not the author or an admin.

---

### 6. Delete Post

**DELETE** `/api/posts/{id}/`

Deletes a post. Only the post's author or an admin can perform this action.

**Headers:**
Authorization Token 187b013119a52aefec78cfc4008326fac33281b

**Response** `204 No Content` on success.

**Response** `403 Forbidden` if the requester is not the author or an admin.

---

## Permissions Summary

| Action | Who can do it |
|---|---|
| View posts (list/retrieve) | Anyone, no login required |
| Create a post | Any logged-in user |
| Edit/Delete a post | Only the post's author, or any user with `role: admin` |

---

## Notes for Frontend Integration

- Backend runs on `http://localhost:8000`
- CORS is enabled for `http://localhost:3001`
- List endpoint is paginated — use `results` array, not the raw response, for rendering post lists
- `author` field is auto-set server-side; never send it when creating a post