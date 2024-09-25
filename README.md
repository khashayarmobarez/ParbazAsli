# Digilogbook
## An app to log your paragliding flights and manage your courses and club as a coach or improve and get your flight certificates through leveling up as a student
### [digilogbook.ir](https://digilogbook.ir/)

# documentation table of contents
1. How to run the project, npm commands
2. developers
3. Warnings before development
4. Softwares required to run this project
5. folder structure


# How to run the project, npm commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
Installs all the dependencies required for the project. Make sure to run this command before starting the project for the first time or whenever dependencies are added.

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
### front end developed by Khashayar Mobarez Haghighi for Parbaz company
### backend developed by hesam javadi
### UI/UX designed by Sheyda Rahmani



# Warnings before development:
### 1 - the requests in the navbar: 
    if you intend to change the structure of the requests in the navigation bar, remember to limit them for when user is exploring Landing pages(landing, about us, contact us...) without logging in or technically without token, now all the requests has been limited to not request if the token doesn't exist



# Softwares required to run this project
    ### Required Software

    To run this project, you will need to have the following software installed on your machine:

    1. **Node.js**: This project requires Node.js. You can download it from [nodejs.org](https://nodejs.org/).
    2. **npm**: npm is the package manager for Node.js. It is installed automatically with Node.js.
    3. **Git**: Version control system to clone the repository. You can download it from [git-scm.com](https://git-scm.com/).

    ### Optional Software

    1. **Visual Studio Code**: A powerful code editor for development. You can download it from [code.visualstudio.com](https://code.visualstudio.com/).

    Make sure to install these before proceeding with the project setup.



# Folder Structure


After cloning the repository, you will see the following folder structure:

```
my-app/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── digilogBookAppLogo.png
│   └── ...
├── src/
│   |
│   ├── components/
│   |   │  
│   │   ├── assets/
│   |   │   ├── ApiData Temporary/
│   |   │   ├── Fonts/
│   |   │   ├── icons/
│   |   │   ├── loading/
│   |   │   ├── logo/
│   |   │   ├── map/
│   |   │   └── ...
│   |   │  
│   │   ├── components/
│   |   │   ├── Footer/
│   |   │   |   ├── Footer.js
│   |   │   |   └── Footer.module.css
│   |   │   |
│   |   │   ├── Header/ (includes the navigation bar)
│   |   │   |   ├── Navbar.js
│   |   │   |   └── Navbar.module.css
│   |   │   |
│   |   │   ├── inputs/
│   |   │   |   ├── DateInput.js
│   |   │   |   ├── DropDownInput.js
│   |   │   |   ├── FixedInput.js
│   |   │   |   ├── InputWithButton.js
│   |   │   |   ├── LongTextInput.js
│   |   │   |   ├── MultipleSelect.js
│   |   │   |   ├── NumberInput.js
│   |   │   |   ├── PasswordInput.js
│   |   │   |   ├── SearchInput.js
│   |   │   |   ├── SearchInputWithDropDown.js
│   |   │   |   ├── SearchMultipleSelectStudent.js
│   |   │   |   ├── textInput.js
│   |   │   |   ├── TimeInput.js
│   |   │   |   ├── UploadFileInput.js
│   |   │   |   └── DescriptionInput.js
│   |   │   |
│   |   │   ├── Loader/
│   |   │   ├── pages/ (includes the sub pages and components of the app)
│   |   │   └── reusable/
│   |   │  
│   │   ├── containers/ (includes the main pages of the app)
│   |   │   ├── LandingPage.js
│   |   │   ├── AboutUs.js
│   |   │   ├── Blogs.js
│   |   │   ├── ContactUs.js
│   |   │   ├── Profile.js
│   |   │   ├── EditProfile.js
│   |   │   ├── Notifications.js
│   |   │   ├── Settings.js
│   |   │   ├── Equipment.js
│   |   │   ├── MyCourses.js
│   |   │   ├── Education.js
│   |   │   ├── Club.js
│   |   │   ├── SyllabiList.js
│   |   │   ├── AddFlight.js
│   |   │   |── FlightHistory.js
│   |   │   └── OrganDashboard.js (disabled and removed from this project, 'commented out')
│   |   │  
│   │   ├── styles/ 
│   │   ├── Utilities/ (REALLY IMPORTANT, includes the HEART OF THE APP, API, REDUX, HOOKS AND DATA PROVIDERS)
│   |   │   ├── LandingPage.js
│   |   │   └── ...
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── index.js
│   │   └── ...
│   |
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```

### Description of Folders

- **node_modules/**: Contains all npm dependencies.
- **public/**: Contains static files such as `index.html` and images.
- **src/**: Contains the source code for the React application.
    - **components/**: Contains React components.
    - **assets/**: Contains images, styles, and other assets.
    - **services/**: Contains API service files.
    - **utils/**: Contains utility functions.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Lists project dependencies and scripts.
- **README.md**: Project documentation.