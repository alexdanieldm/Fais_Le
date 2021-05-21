# To Do Application
A To Do application build with React Native for mobile devices

### Getting Started 
1. First, remember to install all the dependencies by ruuning:  
```bash
npm install
```  

2. Now you will need to start Metro, the JavaScript bundler that ships with React Native, please run:
```bash
npx react-native start
```   

2. Finally, let Metro run in its own terminal. Open a new terminal and run the following:
```bash
npx react-native run-android
```  

### Caveats
* _**IMPORTANT: This app uses "ListView" and "AsyncStorage", both are no longer manting from React Native Official Team**_  

* If you choose to go with a React Native v0.60 or above, please note that "ListView" and "AsyncStorage" are being imported from a community library  

* A better expirence can be achive be using React Native v0.60 or prior
  * If you choose to go this route please remember to comment line 14 and 15 on the App.js file, they should look like this  
  ```javascript
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ListView from 'deprecated-react-native-listview';
  ```
