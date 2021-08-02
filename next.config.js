module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['blogged-for-you.herokuapp.com'],
  },
   env: {
    API_REG_USER_URL: 'https://blogged-for-you.herokuapp.com/api/posts/',
    API_UNREG_USER_URL : 'https://blogged-for-you.herokuapp.com/api/all-posts',
    API_LOGIN_URL : 'https://blogged-for-you.herokuapp.com/api/login',
    API_REGISTER_URL : 'https://blogged-for-you.herokuapp.com/api/register',
    API_AUTHORS_URL : 'https://blogged-for-you.herokuapp.com/api/authors',
    API_IMAGE_URL : 'https://blogged-for-you.herokuapp.com/uploads/'

  },
} 
