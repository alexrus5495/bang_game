#!/bin/bash

cleanup() {
  printf "\r\033[KShutting down servers...\n"
  # Kill all child processes
  pkill -P $$
  exit 0
}

trap cleanup SIGINT SIGTERM

# Run servers
(cd ~/Repos/bang_game && npm run dev) &
GAME_PID=$!
(cd ~/Repos/Bang_server && npm run dev) &
SERVER_PID=$!

# Open browser page
sleep 3
# xdg-open http://localhost:5173/ 2>/dev/null || echo "Please open http://localhost:5173/ in your browser"

# Wait before closing
wait $GAME_PID $SERVER_PID

cleanup
