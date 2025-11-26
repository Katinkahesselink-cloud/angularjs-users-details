# Copilot Agent Notes

- Always run builds and gulp tasks with Node 12.22.12.
- If the shell is using another Node version, prepend the Node 12 installation to `PATH` before running commands:
  - PowerShell: ``$env:PATH = "C:\Program Files\nodejs;" + ($env:PATH -replace "C:\\nvm4w\\nodejs;?","")``
- Keep using `npx gulp ...` instead of assuming a global gulp CLI.
