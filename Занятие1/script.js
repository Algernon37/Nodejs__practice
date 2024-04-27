const http = require('http');

// Объект для хранения счётчиков просмотров страниц
const viewCounts = {
    '/': 0,
    '/about': 0
};

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        viewCounts['/']++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Hello, world!</h1>
        <p>Просмотров этой страницы: ${viewCounts['/']}</p>
        <a href="/about">Перейти на страницу "about"</a>`);
    } else if (req.url === '/about') {
        viewCounts['/about']++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Hello, world on the about page!</h1>
        <p>Просмотров этой страницы: ${viewCounts['/about']}</p>
        <a href="/">Вернуться на главную</a>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Страница не найдена</h1>
        <p>Пожалуйста, проверьте URL.</p>`);
    }
});

const port = 5000;
server.listen(port, () => {
    console.log(`Сервер успешно запущен на порту ${port}`);
});
