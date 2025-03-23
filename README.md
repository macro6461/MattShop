# MattShop

This is the Ecommerce Mobile App, *MattShop*, written with React Native and TypeScript.

## Instructions

1. When you clone the project, run `yarn` in the terminal (or if you're using npm, run `npm i`).
2. Once all dependencies are installed, you can run the project by running `yarn start` (or `npm start`) and then following the prompts that follow. You can also run the app on your preferred platform in expo by running `yarn ios` or `yarn android` from the start instead of running `yarn start` and then following the prompts.

## Usage

When you start the app, you are brought to the Products Feed page, which shows you a list of fetched products. I make the initial product request in `store.ts` so as to execute it as soon as the app loads and to remove this logic from the other components. This way I have the data available at the beginning, I do not need to wait for other dependencies in other components, and I don't need to utilize `useAppDispatch` in more components which only need the global state value (accessed via `useAppSelector`). This allows our UI components to be as lightweight as possible and avoid unnecesarry expenditures/renders, improving overall app performance.

Each product is listed uniformly, and at the top there is a search bar where you can search by the products' `title` property. While I could've filtered the product list every time the state value tied to the searchbar changes, I found this to be expensive and not very performant. I added my own `debounce` function to ensure we only filter the list when the user hasn't typed anything for one second or more. This allows us to significantly reduce renders and only re-render the list when is optimal, such as after a user has corrected a spelling/grammar error or when a user has fully typed out their requested search, *thus improving both app performance and the user experience.*

If you click on an item and you are not logged in, you are redirected to the Login screen to enter your credentials. In this challenge, I was asked to used the `https://fakestoreapi.com/users` endpoint to check for user credentials against existing users. I am also using this endpoint to fetch the profile data for a given user. Despite both activities (logging in and getting profile data) utilize the same request, I broke them out into separate API methods because they rely on different request parameters and would be treated separately in a typical app that involves more conventional authentication.

Once the user logs in, they are redirected from the Products Feed page to the Product Description page of the product they selected before logging in. This pages shows product data, including price, the image, ratings, and other information. Once logged in, the user can also navigate via the tabs at the bottom of the app to their Profile page. It is in this page where they can see their personal information, as well as log out if they so choose.

I am also utilizing `async-storage` to store the logged in user data (much like you would with a JWT token or some kind of other cookie data) to store the `loggedIn` status and user id. If you restart the app, it checks for the stored `loggedIn` key. If it finds it, it makes the request for getting the profile data.

```javascript
dispatch(handleGetProfile({userId: res}))
```

It also sets the auth reducer's state value for `loggedIn` to true. By utilizing `async-storage`, I persist the user's `loggedIn` status and information even when the app restarts--ensuring the user doesn't have to log in every time the app restarts.

*Note: When I say more conventional authentication, I am referring to a dedicated login endpoint that utilizes JWT authentication and OAuth from third parties, such as Google. To see how I've done it before, you can check out my [Authentication API in my SimStock](https://github.com/macro6461/sim-stock/blob/main/api/authApi.ts) react app.*

## Testing

I have a Jest test suite for this project. You can see the configuration in `jest.config.js`, the jest setup file in `setup-testing.js`, and the file that simulates `App.tsx` in `src/App.test.tsx`. While these files were added by default upon creating the project, I did need to make some changes for my specific use case.

I needed to add `__mocks__/@react-native-async-storage/async-storage.js` to mock the use of AsyncStorage in the app. I also needed to make changes to `jest.config.js` file to ensure the setup files for the tests included the `react-redux` module, which is ignored by default. Finally, I had to make changes the below changes to the `setup-testing.js` file.

```javascript
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
    multiGet: jest.fn(),
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
  }));
```
