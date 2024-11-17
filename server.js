const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());  // Đảm bảo sử dụng express.json() để phân tích dữ liệu JSON
app.use(cors());  // Bật CORS để cho phép kết nối từ các nguồn khác

// Đọc dữ liệu từ file movies.json
const getMovies = () => {
  const filePath = path.join(__dirname, 'data', 'movies.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};
//
const getNews = () => {
  const filePath = path.join(__dirname, 'data', 'news.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};
//
const getCinemas= () => {
  const filePath = path.join(__dirname, 'data', 'cinemas.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};
//
const getProducts= () => {
  const filePath = path.join(__dirname, 'data', 'product.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};
// API GET - Lấy danh sách phim
app.get('/movies', (req, res) => {
  const movies = getMovies();
  res.json(movies);
});
//
app.get('/news', (req, res) => {
  const movies = getNews();
  res.json(movies);
});
//
app.get('/cinemas', (req, res) => {
  const cinemas = getCinemas();
  res.json(cinemas);
});
//
app.get('/products', (req, res) => {
  const cinemas = getProducts();
  res.json(cinemas);
});

// API GET - Lấy chi tiết phim theo ID
app.get('/movies/:id', (req, res) => {
  const movies = getMovies();
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});

// API POST - Thêm phim mới
app.post('/movies', (req, res) => {
  const movies = getMovies();
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);

  fs.writeFileSync(
    path.join(__dirname, 'data', 'movies.json'),
    JSON.stringify(movies, null, 2)
  );
  res.status(201).json(newMovie);
});

// API DELETE - Xóa phim theo ID
app.delete('/movies/:id', (req, res) => {
  let movies = getMovies();
  movies = movies.filter(m => m.id !== parseInt(req.params.id));

  fs.writeFileSync(
    path.join(__dirname, 'data', 'movies.json'),
    JSON.stringify(movies, null, 2)
  );
  res.status(204).send();
});

// Lắng nghe tại cổng
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});