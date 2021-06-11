import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDwUOr35BcrbOFA5197umplyZEVOq359rw',
	authDomain: 'todo-rn-4699d.firebaseapp.com',
	databaseURL: 'https://todo-rn-4699d-default-rtdb.firebaseio.com/',
	projectId: 'todo-rn-4699d',
	storageBucket: 'gs://todo-rn-4699d.appspot.com',
	messagingSenderId: '819123880621',
	appId: '1:819123880621:web:a3ea0818726e16db6dfc24',
	measurementId: 'G-QP6Y9WHBKX'
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export { firebase };
