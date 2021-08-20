import { firebase } from '../firebase/config';

const onSignOut = () => {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
};

export default onSignOut;
