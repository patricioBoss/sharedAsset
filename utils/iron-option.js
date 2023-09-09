import config from '../config/config';

const option = {
  cookieName: 'auth/session',
  password: config.ironPassword,
  cookieOptions: {
    secure: config.env === 'production',
    maxAge: undefined,
  },
};

export default option;
