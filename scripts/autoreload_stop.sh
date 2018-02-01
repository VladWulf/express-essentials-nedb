#!/bin/sh
if [ "$AUTORELOAD_PID" > "0" ]
then
  kill $AUTORELOAD_PID
  echo Closing Reload Server
fi
