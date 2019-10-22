import app from './app';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT as number, error => {
  if (error) throw error;
  console.log(`> Ready on http://localhost:${PORT}`);
});
