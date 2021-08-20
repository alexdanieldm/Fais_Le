# Fais Le

A ToDo application for mobile devices (iOS or Android) build with React Native and Firebase.
_See a scaledown version without all the feautures listed below [here](https://egghead.io/courses/build-a-react-native-todo-application)_

## Features

A Firebase implementation with a connection to Firestore Database, this enable the app to do the following:

1. _User `Creation` and `Authentication`_

2. _`Synchronize` data across multiple devices_

3. _`Persist` user Credentials_

4. _Real time `CRUD` ( that is Create, Read, Update and Delete data )_

## Getting Started

1. Assuming that you have Node 12 LTS or greater installed, you can use npm to install the Expo CLI command line utility:

    ```bash
    npm install -g expo-cli
    ```

2. After that, remember to install all the dependencies by ruuning:  

    ```bash
    expo install
    ```

3. To have all environment variables set follow two steps:

   - Create a .env file base on the template provide:

    ```sh
    cp env.template .env
    ```

    - There replace all values with your firebase configuration. You can get all this information from [Firebase Console](https://console.firebase.google.com/) -> Project Settings

4. Now you will need to start Metro, the JavaScript bundler that ships with React Native, so please run:

    ```bash
    expo start
    ```
