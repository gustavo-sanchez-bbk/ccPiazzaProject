#!/bin/bash
# Check if a process is using port 3000 and kill it
# This is because I am currently having an issue with PORT3000 not being released by NPM or the app crashing when making changes 

# May not be needed once we move this to GCP 

PORT=3000

# Get the process ID that is using the specified port
PROCESS_ID=$(lsof -t -i :$PORT)

# Check if a process is using the port
if [ -n "$PROCESS_ID" ]; then
  echo "Killing process $PROCESS_ID using port $PORT"
  kill -9 $PROCESS_ID
  echo "Process terminated"
else
  echo "No process is using port $PORT"
fi