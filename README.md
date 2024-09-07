<!-- the development document at the end -->

# the development document after the npm commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



# developers
## this app front end (this project) is developed by khashayar mobarez haghighi for parbaz company
## the backend of this app is developed by hesam javadi

## warnings before development:
### 1 - the requests in the navbar: 
    if you intends to change the structure of the requests in the navigation bar, remember to limit them for when user is exploring Landing pages(landing, about us, contact us...) without logging in or technically with out token, now all the requests has been limited to not request if the token doesn't exist

<!-- ### 2- the color variables:
    when i started coding this project the documantion about the styling of the project was a mess and also i was a junior without a senior oversight, so the color variables section is a bit problematic, to fix this bug you should go to this location /Utilities/Hooks/useAppModeEffect.js 
        this section was designed to handle light mode and dark mode but the colors aren't imported correctly, you can fix it in a little bit of time -->
