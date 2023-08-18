## Overview
This is Kyle Kim's takehome project for Indigov's Senior Software Engineer position.

## App Info and Important Routes

### Data
* The existing 500 records are in the database.csv file in the root of this project!
* The data to upload is in the upload.csv file in the root of this project
* back up of the original 500 are in the backup.database.csv if we want to rerun the upload function!
* Data upload with an empty dataset should work! We should be able to upload the raw 500 if anything goes wrong!

### Routes
(There is a navbar to navigate through pages)
* http://localhost:3000/ Is our home page! 
* http://localhost:3000/constituents/upload is our upload page!
* http://localhost:3000/constituents/view is our view page! 
* http://localhost:3000/{no match} is a simple splat route that redirects to the upload page!

## Remarks on tradeoffs!

### CSV over Database
I did decide to go with no database to reduce any friction and set up confusion when running this app.

### Styling & Components
* I decided to share one stylesheet for the sake of time! 
I do know it's better practice to export a links funciton per route you have, but since I knew I was only making a handful of components. I decided to just have my styles global for the time being.

* I also decided to just go with a quick "card(s)" component for the sake of time as well. Generally a table would have been nice, or having an individual card component and doing a list over each card component would have been a better approach, but I did want to make sure I had time to think through the backend portion of the project a bit more.

### ErrorBoundary

* I was having a difficult time spinning up a "re-usable" ErrorBoundary component (So I did a copy paste job there). I think maybe making a custom hook for Error Component is the most seamless way of making these components more re-usable. 


### Technologies used:
* TypeScript
* Node
* Remix

## Pre-reqs
1. Node version 18! (I use nvm)
2. Install dependencies

### Installing Node 18:

``` sh
brew install nvm
```

### Add nvm to your .zprofile/bash_profile
``` sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

### Install and use the long-term support version of node 18
``` sh
nvm install lts/hydrogen
nvm use lts/hydrogen
```

## Development 
From your terminal install the dependencies and run the app!:
```sh
npm install
npm run dev
```


This starts your app in development mode, rebuilding assets on file changes. The application should be accessible via http://localhost:3000/

