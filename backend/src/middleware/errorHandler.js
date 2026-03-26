/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  if (status >= 500) {
    return res.status(500).json({ error: 'Something went wrong!' });
  }

  return res.status(status).json({ error: message });
}
/* eslint-enable no-unused-vars */
