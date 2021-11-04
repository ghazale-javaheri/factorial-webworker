# Factorial with Webworker

This is a math utility that can calculate factorial for large numbers. You can enter any value from 0 to 9999 to the input box and after pressing Add For Calculation, the app puts the number to the output queue and start to calculate its factorial. it will show the result after completion.
by using Web Workers makes it possible to calculate a factorial operation in background thread separate from the main execution thread of a web application. The advantage of this is that laborious processing can be performed in a separate thread, allowing the main (usually the UI) thread to run without being blocked/slowed down.
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
