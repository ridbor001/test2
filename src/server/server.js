const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const placeRoutes = require('./routes/placeRoutes');
const pathRoutes = require('./routes/pathRoutes');

const app = express();

// 启用 CORS
app.use(cors());

// 解析 JSON 数据
app.use(express.json());

// 数据库连接
mongoose.connect('mongodb+srv://ridbor001:15725817321q@cluster0.syb87.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true,

})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// 路由
app.use('/api/places', placeRoutes);
app.use('/api/path', pathRoutes);

// 服务器启动
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
