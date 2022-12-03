echo 'Starting Setup'
apt install python3-pip -y
python3 -m pip install youtube-dl
echo 'Installed youtube-dl'
npm install yarn -y
yarn install
echo 'Installed Dependencies'
yarn build
echo 'Built Project'
echo 'Please copy and fill out example.env and then run "yarn initDownload" and "yarn slashiesSet" before running "yarn start"'