const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

// เปิดใช้งาน CORS
app.use(cors());

// ตั้งค่าเสิร์ฟไฟล์ static เช่น index.html
app.use(express.static(path.join(__dirname, 'public')));

// ตั้งค่า Proxy
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://5h6ocv0hb8.execute-api.us-east-1.amazonaws.com',
    changeOrigin: true,
  })
);

// ถ้าไม่มีเส้นทางตรงกัน ให้ส่ง index.html กลับ
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
// เริ่มเซิร์ฟเวอร์
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
