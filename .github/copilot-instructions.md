# Copilot Agent Notes

- Always run builds and gulp tasks with Node 20.19.4.
- If the shell is still picking up the old MSI install under `C:\Program Files\nodejs`, strip it from `PATH` so nvm’s Node 20 wins, then select it:
  - PowerShell: ``$env:PATH = ($env:PATH -replace "C:\\Program Files\\nodejs;?",""); nvm use 20.19.4``
- Keep using `npx gulp ...` instead of assuming a global gulp CLI.
