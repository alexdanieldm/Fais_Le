# To Do Application

Application for mobile devices (iOS or Android) build with React Native and Firebase.
_[See here](https://egghead.io/courses/build-a-react-native-todo-application) a version without all the feautures listed below_

## Features

A Firebase implementation with a connection to Firestore documents, to allow the app to:

1. _User `Creation` and `Authentication`_

2. _`Synchronize` data across multiple devices_

3. _`Persist` user Credentials_

4. _Real time `CRUD` ( that is Create, Read, Update and Delete data )_

Significant changes made compare to [this version](https://egghead.io/courses/build-a-react-native-todo-application), are the following:

1. _From Class Components to **Functional Components**_

2. _From `ListView` component to **`FlatList`** component_

3. _From `componentWillMount` to **`useEffect()`** hook_

4. _All function and Hooks are more **declarative** (trust me it matters) and use **ECMAScript 2015** best practices_

## Getting Started

1. First, remember to install all the dependencies by ruuning:  

    ```bash
    npm install
    ```

2. Now you will need to start Metro, the JavaScript bundler that ships with React Native, let Metro run in its own terminal, please run:

    ```bash
    npm run start
    ```

3. To have all environment variables set follow two steps:

   - Create a .env file base on the template provide:

    ```sh
    cp env.template .env
    ```

    - There replace all values with your firebase configuration. You can get all this information from [Firebase Console](https://console.firebase.google.com/) -> Project Settings

4. Finally, while running Metro, open a new terminal and run either:

    - _For Andorid:_

    ```bash
    npm run android
    ```

    - _For iOS:_

    ```bash
    npm run ios
    ```

    - _For Cleaning build:_

    ```bash
    npm run clean
    ```
