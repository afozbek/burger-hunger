# Burger Hunger Project

Burger Hunger project is maid for personal development purposes. [Live Demo](https://afozbek.github.io/Burger-Hunger/)

## Getting Started

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

- If you have problems please leave an issue from [here](https://github.com/afozbek/Burger-Hunger/issues)
- Consider forking the project and submitting new pull requests. I am much likely control [my github account](https://github.com/afozbek).

## Author

- Follow me on [_github_](https://github.com/afozbek)
- Follow me on [_gitlab_](https://gitlab.com/afozbek)
  > Contact me for your problems from [here](mailto:furkanozbek1995@gmail.com). I am gladly answer you 😊.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

