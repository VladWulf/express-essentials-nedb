#!/bin/sh
nohup node scripts/autoreload.js & >> /dev/null
AUTORELOAD_PID=$!
echo Reload server running with PID: $AUTORELOAD_PID
