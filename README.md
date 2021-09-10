# dummyFleetManager

Basic Electron + ReactJS app written from scratch.

## Disclaimer
I didn't use any libraries other than the stricly necessary (Electron, ReactJS, Babel, Webpack and Mocha). And I didn't copy any code from other projects or templates.
On top of that, there is a limit (and short) amount of time that I can invest in this project. That is why the styling is poor and the coverage is not high.
What I've focused was on a clear structure that is easy to read and does not violate the architecture of an Electron app. For everything else I just tried to make things work with the smallest (but 100% mine) effort.

## Installation

After cloning, run 'npm install'
Then build the frontend with 'npm run build'

## Running

npm start

## Testing

npm test

## Project Structure
- Root folder don't have any code. Just configuration files and the storage.json file (used for data storage)
- src folder contains the electron core. "main.js" has the application startup and the events' setup. preload.js contains the methods that are accessible on the Renderer's side ("frontend")
- src/core contains the data models (class definitions) and the controller.js file, which is reponsible for handling the requests and accessing the data storage.
- src/web contains the ReactJS part. After running the build, a "bundle" folder will be created with the webpack output. The "components" folder contains the ReactJS components.
- test folder contains the test.js files, which just tests the data model files.
