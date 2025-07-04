# Dự án back-end website technology

Dự án backend Node.js sử dụng Docker để đóng gói và triển khai.

## Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB (mặc định kết nối qua biến môi trường)
- Docker / Docker Compose

## Khởi chạy local (không Docker)

1. Cài Node.js (>= v20)
2. Cài Yarn
3. Cài đặt thư viện
   ```bash
   yarn install
   ```
4. Tạo file .env cấu trúc giống với .env.example
5. Chạy dự án back-end:
   ```bash
   yarn start
   ```

## Chạy dự án bằng Docker:

**Build Docker image:**
   ```bash
   docker build -t chien2602/web_technology:latest .
   ```
**Chạy Container:**
   ```bash
   docker run -p 3000:3000 chien2602/web_technology:latest
   ```
**Endpoint Swagger API: /api-docs**