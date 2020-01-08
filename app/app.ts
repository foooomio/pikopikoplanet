import express, { ErrorRequestHandler } from 'express';
import path from 'path';
import createError from 'http-errors';
import { getStatusText } from 'http-status-codes';
import morgan from 'morgan';

import resourceRouter from './routes/resource';
import dataRouter from './routes/data';
import mainRouter from './routes/main';

const app = express();
app.disable('x-powered-by');

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// access log
app.use(morgan('short'));

// routes
app.use('/resource', resourceRouter);
app.use('/data', dataRouter);

app.use(express.static(path.join(__dirname, '/public')));
app.use(mainRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(((err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const statusText = getStatusText(statusCode);

  res.status(statusCode);
  res.render('error', { statusCode, statusText });
}) as ErrorRequestHandler);

export default app;
