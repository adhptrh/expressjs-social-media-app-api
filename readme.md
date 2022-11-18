
# Simple Social Media App API menggunakan NodeJS

### Teknologi:
- Menggunakan ExpressJS sebagai backend web framework.
- Menggunakan Json Web Token (JWT) untuk metode autentikasi user.
- Menggunakan Bcrypt untuk melakukan hashing password user dan diperkuat menggunakan metode dynamic salt.
- Menggunakan PostgreSQL untuk database.
- Menggunakan library Prisma sebagai ORM dan sistem migrasi database.
- Menggunakan library express-validator untuk memudahkan validasi request
- Menggunakan render.com untuk mendeploy web ini.

## Dokumentasi API
dokumentasi response belum selesai semua.
<details>
    <summary>Registrasi Akun</summary>

### Request
    
```http
POST http://localhost:3000/auth/register
Content-Type:  application/json

{"username":"isi_username","password":"isi_password"}
```
### Response
Status: **200** - Berhasil mendaftar akun
```json
{
  "status": true,
  "message": "User registered"
}
```
Status: **403** - Username sudah terdaftar
    
```json
{
  "status": false,
  "message": "User already registered"
}
```
Status: **400** - Request tidak valid, seperti: kolom tidak diisi
    
```json
{
  "status": false,
  "message": "Invalid request",
  "data": {
    "errors": [...]
  }
}
```
</details>

<details>
    <summary>Login Akun</summary>

### Request
    
```http
POST http://localhost:3000/auth/login
Content-Type:  application/json

{"username":"isi_username","password":"isi_password"}
```
### Response
Status: **200** - Berhasil login
```json
{
  "status": true,
  "message": "Successfully logged",
  "data": {
    "token": "..."
  }
}
```
Status: **401** - Username tidak terdaftar
    
```json
{
  "status": false,
  "message": "Invalid username"
}
```
Status: **401** - Password salah
    
```json
{
  "status": false,
  "message": "Wrong password",
}
```
</details>

<details>
    <summary>Data akun yang terautentikasi dengan token JWT</summary>

### Request
    
```http
GET http://localhost:3000/auth/me
Authorization: Bearer (JWTTOKEN)
```
### Response
Status: **200** - Berhasil parse token JWT
```json
{
  "status": true,
  "message": "Authenticated",
  "data": {
    "id": "8c206003-80dd-4867-9176-7d4ee3146a22",
    "username": "isi_username",
    "created_at": "2022-11-18T13:27:20.146Z"
  }
}
```
Status: **401** - Gagal parse token JWT
    
```json
{
  "status": false,
  "message": "Unauthorized"
}
```
</details>

<details>
    <summary>Membuat Postingan</summary>

### Request
    
```http
POST http://localhost:3000/post
Authorization: Bearer (JWTTOKEN)
Content-Type: application/json

{"content":"isi_konten"}
```
### Response
Status: **200** - Berhasil posting
```json
{
  "status": true,
  "message": "Successfully posted!",
  "data": {
    "id": "cd3abed2-d3aa-4d0d-bced-501b02ff6334",
    "content": "isi konten",
    "authorId": "5e9b33cb-85d7-46c4-ae43-32aec08c6f40",
    "created_at": "2022-11-18T17:37:26.253Z"
  }
}
```
</details>

<details>
    <summary>Mengambil Semua Postingan</summary>

### Request
    
```http
GET http://localhost:3000/post
```
### Response
Status: **200** - Berhasil mengambil postingan
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "posts": [
      {
        "id": "7e6d2413-a1a9-45e3-9ce9-665a5d39ef6d",
        "content": "isi konten",
        "created_at": "2022-11-18T14:38:41.052Z",
        "author": {
          "id": "8c206003-80dd-4867-9176-7d4ee3146a22",
          "username": "isi_username",
          "created_at": "2022-11-18T13:27:20.146Z"
        },
        "_count": {
          "likes": 0
        }
      },...
    ]
  }
}
```
</details>

<details>
    <summary>Mengambil 1 Postingan</summary>

### Request
    
```http
GET http://localhost:3000/post/(id_postingan)
```
### Response
Status: **200** - Berhasil mengambil postingan
```json
{
  "status": true,
  "message": "Success",
  "data": {
    "posts": {
      "id": "7e6d2413-a1a9-45e3-9ce9-665a5d39ef6d",
      "content": "isi konten",
      "created_at": "2022-11-18T14:38:41.052Z",
      "author": {
          "id": "8c206003-80dd-4867-9176-7d4ee3146a22",
          "username": "isi_username",
          "created_at": "2022-11-18T13:27:20.146Z"
      },
      "_count": {
          "likes": 0
      }
    }
  }
}
```
</details>

<details>
    <summary>Mengupdate Postingan</summary>

### Request
    
```http
PATCH http://localhost:3000/post/(id_postingan)
```
### Response
Status: **200** - Berhasil mengupdate postingan
```json
{
  "status": true,
  "message": "Post updated"
}
```
</details>

<details>
    <summary>Menghapus Postingan</summary>

### Request
    
```http
DELETE http://localhost:3000/post/(id_postingan)
```
### Response
Status: **200** - Berhasil menghapus postingan
```json
{
  "status": true,
  "message": "Post deleted"
}
```
</details>

<details>
    <summary>Memberi like postingan</summary>

### Request
    
```http
POST http://localhost:3000/post/(id_postingan)/like
Authorization: Bearer (JWTTOKEN)
```
### Response
Status: **200** - Berhasil memberi like postingan
```json
{
  "status": true,
  "message": "Post liked"
}
```
</details>

<details>
    <summary>Menghilangkan like postingan</summary>

### Request
    
```http
DELETE http://localhost:3000/post/(id_postingan)/like
Authorization: Bearer (JWTTOKEN)
```
### Response
Status: **200** - Berhasil menghilangkan like postingan
```json
{
  "status": true,
  "message": "Post unliked"
}
```
</details>