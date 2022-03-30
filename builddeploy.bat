@ECHO OFF
npm run build && firebase deploy --only hosting
PAUSE