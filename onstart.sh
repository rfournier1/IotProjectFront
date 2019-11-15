#!/bin/bash

sudo modprobe -r pn533_usb
sudo modprobe -r pn533

npm start
npm run electron

