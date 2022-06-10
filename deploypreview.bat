@ECHO OFF
npm run build && firebase hosting:channel:deploy eh-preview --expires 3d
PAUSE