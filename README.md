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
* _**IMPORTANT: This app uses "ListView" and "AsyncStorage", both are deprecated and no longer maintained by the Official React Native Team, thus all instances of "ListView" and "AsyncStorage" are imported from a community library**_  

* A better experience can be achieved using React Native v0.60 or earlier
  * If you choose to go this route please remember to comment line 14 and 15 on the App.js file, they should look like this  
  ```javascript
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ListView from 'deprecated-react-native-listview';
  ```
