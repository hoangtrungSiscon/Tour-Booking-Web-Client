# Sử dụng image Node.js để build ứng dụng
FROM node:18 as build

# Đặt thư mục làm việc
WORKDIR /app

# Copy toàn bộ mã nguồn vào container
COPY . .

# Cài đặt các dependencies
RUN npm install --legacy-peer-deps

# Build ứng dụng React
RUN npm run build

# Sử dụng Nginx để phục vụ ứng dụng
FROM nginx:stable-alpine

# Copy file build vào thư mục Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
