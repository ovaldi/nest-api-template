module.exports = {
  apps : [{
    name: 'nest-api-template',
    script: './dist/main.js',
    cwd: '/path/to/nest-api-template/',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: "production",
      GOOGLE_APPLICATION_CREDENTIALS: "/path/to/firebase-adminsdk-key.json"
    },
  }],
};
