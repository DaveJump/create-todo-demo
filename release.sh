#!/bin/bash
VERSION="minor"
checkSemver() {
  [[ "$1" == "patch" || "$1" == "minor" || "$1" == "major" ]]
}
runRelease() {
  if checkSemver $VERSION;then
    git config user.name "DaveJump"
    git config user.email "davejump@foxmail.com"
    git tag $VERSION
    git push --follow-tags origin main
    nrm use npm
    npm version $VERSION
    npm publish --access public
  else
    echo "version is invalid !"
    exit
  fi
}
if [ -n "$1" ];then
  if checkSemver "$1";then
    VERSION="$1"
  fi
else
  read -p "Enter the version in \"patch\", \"minor\", \"major\": " VER
  if checkSemver $VER;then
    VERSION=$VER
  fi
fi
runRelease
