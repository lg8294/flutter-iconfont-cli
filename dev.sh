set -e

rm -rf ./build
rm -rf ./src/iconfont

./node_modules/.bin/tsc

mv ./build/src/* ./build
rm -rf ./build/src ./build/snapshots
cp README.md package.json LICENSE ./build
cp -rf src/templates ./build/templates

chmod +x ./build/commands/*
cd build
npm link
