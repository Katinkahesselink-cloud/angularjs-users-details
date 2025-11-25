# AngularJS Users Details App

This is an AngularJS Project implements a scalable hierarchy to easily scale the application as extra features required. It always contains a Gulp file with many features to easily build AngularJS application.

## [ Live Demo](https://users-detials.netlify.com " Live Demo")

## Installation

Run `npm install` to install required npm dependancies.

## Development server

Run `gulp dev` for a dev server. Navigate to `http://localhost:8000/index.html`. The app will automatically reload if you change any of the source files.

## Build

Run `gulp build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 2025 install instructions

- Use Node 12.x (e.g., `nvm install/use 12.22.12`). The gulp build relies on node-sass bindings that don’t work on newer runtimes.
- Install project dependencies from the repo root: `npm install`.
- Pull front-end libraries listed in bower.json: `npx bower install`.
- For local development run `npx gulp dev`. This builds assets, watches src/**, and hosts index.html at http://localhost:8000.
- For a one-off production bundle run `npx gulp build` and serve the generated dist directory with any static server (npx http-server dist, Azure Static Web Apps, etc.).

If nvm install 12.22.12 keeps failing while downloading the bundled npm ZIP (the npm-v6.14.16.zip 404 we hit), do this instead:

### Manual Node 12 install
Download the MSI directly: https://nodejs.org/download/release/v12.22.12/node-v12.22.12-x64.msi.

Run it (passive install is fine). This drops node.exe and npm into C:\Program Files\nodejs.

In any shell where you’ll work on this project, prepend that path so Node 12 wins over your nvm node (`$env:PATH = "C:\Program Files\nodejs;" + $env:PATH`). Check with `node -v` (should show v12.22.12).

Optional but handy: once Node 12 is in place, tell nvm to “use” it by editing %NVM_HOME%\settings.txt or simply running `nvm use 12.22.12` (nvm will just point to the MSI installation). That way you can still nvm use 20.19.4 later without touching PATH manually.

If `nvm use 12.22.12` doesn't work, try:

`$env:PATH = "C:\Program Files\nodejs;" + ($env:PATH -replace "C:\\nvm4w\\nodejs;?","")`

*If necessary, use copilot to adapt these instructions for local use.*

### Python 2.7 requirement

`node-sass` still shells out to `node-gyp`, which requires Python 2.7 on Windows. If the Python installer didn’t add itself to `PATH`, do the following:

1. Download and install Python 2.7.18 (64-bit) from [python.org](https://www.python.org/ftp/python/2.7.18/python-2.7.18.amd64.msi). Accept the defaults; this places Python under `C:\Python27`.
2. Open **System Properties → Environment Variables**, edit your user `PATH`, and append `C:\Python27;C:\Python27\Scripts`. Alternatively, run the following in PowerShell:

    ```powershell
    [Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Python27;C:\Python27\Scripts", "User")
    ```

3. Verify the interpreter is reachable: `python -V` should print `Python 2.7.18`.
4. Tell npm to always use this interpreter for native builds: `npm config set python "C:\Python27\python.exe"`.

Once these steps are complete, `npm install` no longer fails during the `node-sass` postinstall phase.

## Specification

> Imagine this is an MVP and additional features are already planned for the future. Try structuring the application in a way, that you can easily extend it when the time comes and reuse as much of the code you have already written for this MVP.

  - Create an app that displays all users (#/users) from  /data/users.json file, and a user details page (#/users/{id}).
  - The file should be fetched through ajax, and the data needs to be displayed inside a <table />. 
  - The File should only be fetched once once the app starts. After that, we are working with users from memory, but we need to take care that real backend can be easily added later.
  - The table row should be an Angular directive and each row needs to have checkboxs to select a row.
  - Every row needs to have 3 actions
       *  Show - modal that displays '{firstName} {lastName}, age:{calculateAgeHere}' (use https://angular-ui.github.io/bootstrap/#/modal)
       *  Delete - removes a user from the table
       *  Edit - Opens user detail page
   *  The table should display 10 items per page and needs to have previous-current-next buttons on the bottom.
   *  On the top of the table, place 2 buttons. The buttons are disabled while nothing is selected.
        * Delete - removes selected item(s)
        * Download - downloads marked item as a csv file (use ; as separator)
    * BONUS
        * Display the number of selected items.
        * On the detail page, enable edit of firstname and lastname, add validation and put save (save changes) and cancel (return to /user without saving) buttons.
        * If data was changed in the form and the user clicks "cancel", display a confirm modal with yes/no (https://angular-ui.github.io/bootstrap/#/modal)

