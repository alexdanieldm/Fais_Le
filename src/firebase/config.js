import firebase from 'firebase/app';

import '@firebase/auth';
import '@firebase/firestore';

import { LogBox } from 'react-native';

//! Ignore log notification by message (Warning without fix):
LogBox.ignoreLogs([
	'Setting a timer for a long period of time',
	'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
	'DevTools failed to load source map'
]);

import { API_KEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings({ merge: true, experimentalForceLongPolling: true });

export { firebase };
