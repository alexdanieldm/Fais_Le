# To Do Application

A To Do application build with React Native for mobile devices, this its a *__REFACTOR__* of the app build on course [_"Build a React Native Todo Application"_](https://egghead.io/courses/build-a-react-native-todo-application) on __Egghead__

### Main Changes

The more important and significant changes made compare to the original app made on [this course](https://egghead.io/courses/build-a-react-native-todo-application), are the following:

1. From _Class Components_ to __*Functional Components*__
2. From _`ListView`_ component to __*`FlatList`*__ component
3. From _`componentWillMount`_ to __*`useEffect()`*__ hook
4. All function (or Hooks) are more __declarative__ *(trust me this is important)* and use __ECMAScript 2015__ best practices

### Getting Started

1. First, remember to install all the dependencies by ruuning:  

```bash
npm install
```  

2. Now you will need to start Metro, the JavaScript bundler that ships with React Native, let Metro run in its own terminal, please run:

```bash
npm run start
```

3. To have all environment variables set follow two steps:

* Create a .env file base on the template provide:
```sh
cp env.template .env
```

* There replace all values with your firebase configuration. You can get all this information from [Firebase Console](https://console.firebase.google.com/) -> Project Settings

4. Finally, while running Metro, open a new terminal and run the following:

```bash
npm run android
```  

### Caveats

* _This app uses "AsyncStorage", thus all instances of it are imported from a community library_

  ```javascript
  import AsyncStorage from '@react-native-async-storage/async-storage';
  ```