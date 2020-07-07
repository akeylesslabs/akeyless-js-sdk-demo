This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

JS SDK local installation steps
1. Clone that repo `https://github.com/akeylesslabs/akeyless-javascript-sdk` - this is a package that implements all AKEYLESS JS SDK
2. `cd akeyless-javascript-sdk`
3. `npm install` (in case of XCODE error - skip them)
4. `npm build`
5. `npm link`

Integration of the JS SDK with demo project
1. Clone this repo `https://github.com/akeylesslabs/akeyless-js-sdk-demo`
2. `cd akeyless-js-sdk-demo`
3. `npm install` (in case of XCODE error - skip them)
4. `npm link akeyless_vault_api`
5. Go to `index.js` file 
6. Edit line:9 - add correct base url `apiInstance.apiClient.basePath = "******"`
5. Go to `App.js` file
7. Edit line:6 - add correct AccessId `accessId = "*****"`
8. Edit line:7 - add correct options.
    Example: {
                 'accessType': "access_key",
                 'accessKey': "********",
             }

9. Go to terminal and run `npm start` - script will build the app and open browser tab with running application.
