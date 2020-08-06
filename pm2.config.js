module.exports = {
  apps: [{
    name: 'mercado-track-web',
    script: './server.js',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    exec_mode: 'cluster',
    instances: 'max',
    env: {
      NODE_ENV: 'production',
    },
  }]
}
