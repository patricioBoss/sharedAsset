const config = {
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  ironPassword: process.env.IR0N_PASSWORD || 'complex_password_at_least_32_characters_long',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/proctormedb',
  email: process.env.EMAIL,
  username: 'api',
  password: process.env.PASSWORD,
  saltRounds: process.env.SALTROUNDS || 12,
  smtpPort: process.env.SMTP_PORT || 587,
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
  mailServer: process.env.MAIL_SERVER || 'smtp.mailgun.org',
  storageBucket: process.env.BUCKET_URL,
};

export default config;
