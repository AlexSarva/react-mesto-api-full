const allowedCors = [
  'https://sarva.students.nomoredomains.rocks',
  'http://sarva.students.nomoredomains.rocks',
  'localhost:3001',
  'http://localhost:3001',
  'localhost:3000',
  'http://localhost:3000',
];

const corsCustom = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  // const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }

  next();
};

module.exports = corsCustom;
