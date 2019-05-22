cd ~/mercado-track-web
git checkout master
git pull origin master
npm ci
npm run build
pm2 flush mercado-track-web
pm2 startOrRestart pm2.config.js
