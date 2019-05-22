// pm2 config file
module.exports = {
  apps: [{
    name: 'mercado-track-web',
    script: './server.js',
    env: {
      NODE_ENV: 'production',
    },
  }]
}
