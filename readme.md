
# Simple Social Media App API menggunakan NodeJS

### Teknologi:
- Menggunakan ExpressJS sebagai backend web framework.
- Menggunakan Json Web Token (JWT) untuk metode autentikasi user.
- Menggunakan Bcrypt untuk melakukan hashing password user dan diperkuat menggunakan metode dynamic salt.
- Menggunakan PostgreSQL untuk database.
- Menggunakan library Prisma sebagai ORM dan sistem migrasi database.
- Menggunakan library express-validator untuk memudahkan validasi request
- Menggunakan render.com untuk mendeploy web ini.

## API Docs
<details>
    <summary>Registrasi Akun</summary>
    Request
    
```http
POST http://localhost:3000/auth/register
Content-Type:  application/json

{"username":"isi_username","password":"isi_password"}
```
</details>
