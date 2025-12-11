# AngularJS Users Details App

This is an AngularJS Project implements a scalable hierarchy to easily scale the application as extra features required. It always contains a Gulp file with many features to easily build AngularJS application.

## [ Live Demo](https://users-detials.netlify.com " Live Demo")

## Installation

Run `npm install` to install required npm dependancies.

## Development server

Run `npx gulp dev` for a dev server. Navigate to `http://localhost:8000/index.html`. The app will automatically reload if you change any of the source files.

## Build

Run `npx gulp build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 2025 install instructions

- Use Node 20.19.4 (`nvm install 20.19.4` then `nvm use 20.19.4`). The toolchain now relies on dart-sass and modern TypeScript, so stick with an LTS runtime ≥ 18 (20.19.4 is our tested baseline).
- If you previously forced Node 12 via `$env:PATH = "C:\Program Files\nodejs;" + ...`, remove that override so nvm’s Node 20 is first on `PATH`. A quick fix is `$env:PATH = ($env:PATH -replace "C:\\Program Files\\nodejs;?","") ; nvm use 20.19.4`. Verify with `node -v` (should read v20.19.4).
- Install project dependencies from the repo root: `npm install`.
- Pull front-end libraries listed in bower.json: `npx bower install`.
- For local development run `npx gulp dev`. This builds assets, watches `src/**`, and hosts `index.html` at http://localhost:8000.
- For a one-off production bundle run `npx gulp build` and serve the generated `dist` directory with any static server (`npx http-server dist`, Azure Static Web Apps, etc.).

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

