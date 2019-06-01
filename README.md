# Burger Hunger Project

One Paragraph of project description goes here

## Getting Started

Burger Hunger project is maid for personal development purposes. [Live Demo](https://afozbek.github.io/Burger-Hunger/)

> You need to create firebase project and get and *API_KEY*

If you want to work on local machine, **clone** to project and then in your project working directory inside the *src* folder add `keys.js` file. This file expecting as an import so you should add exactly like that or change the import statement. In the `keys.js` file ;

```js
// add your api key via firebase
export const API_KEY = "YOUR_API_KEY_FROM_FIREBASE";

export const signupUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
  API_KEY;
export const loginUrl =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
  API_KEY;
```

For deploying firebase project you can follow [these](https://www.robinwieruch.de/firebase-deploy-react-js/) steps .

### Installing

You can easily download required packages by running

`npm install`

## Running the tests

This project includes scripts from [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started). You can easily run tests by running

`npm run test`

## Deployment

If you want to deploy project via github pages. Follow [these](https://reactgo.com/deploy-react-app-github-pages/) steps

## Built With

- [Firebase](https://firebase.google.com/) - Database and authentication management
- [React](https://reactjs.org/) - Javascript Library for creating UI
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.

- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Redux middleware for handling async requests
- [Redux Saga](https://github.com/redux-saga/redux-saga)
- [Webpack](https://webpack.js.org/) - Package bundler
- Much More...✌

## Contributing

- You can create issue from [here](https://github.com/afozbek/Burger-Hunger/issues)
- Or you can fork the project and submit new pull requests.


## Author

- You can reach my _github_ account from [here](https://github.com/afozbek)
- You can reach my _gitlab_ account from [here](https://gitlab.com/afozbek)
  > You can contact me anytime you want from [here](mailto:furkanozbek1995@gmail.com)😊.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

