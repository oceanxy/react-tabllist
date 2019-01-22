#!/bin/sh

git remote remove origin git@github.com:oceanxy/react-tabllist.git
git remote add github https://github.com/oceanxy/react-tabllist.git
git remote add coding https://git.dev.tencent.com/Oceanxy/react-tabllist.git

yarn demo && yarn push-demo

