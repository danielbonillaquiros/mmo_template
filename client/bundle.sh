#!/bin/bash
npm run build
rm -rf ../server/public/
mkdir ../server/public
cp -R assets ../server/public/
cp -R build ../server/public/build/
cp index.html ../server/public/index.html