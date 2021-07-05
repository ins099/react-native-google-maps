import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import database from '@react-native-firebase/database';

import App from '../../App';
const firebaseConfig = {
  apiKey: 'AIzaSyCxucDx9z3U576GawV2SItSgQO56Lt4G20',
  authDomain: 'databaseapp-4381b.firebaseapp.com',
  databaseURL: 'https://databaseapp-4381b.firebaseio.com',
  projectId: 'databaseapp-4381b',
  storageBucket: 'databaseapp-4381b.appspot.com',
  messagingSenderId: '202063363050',
  appId: '1:202063363050:android:721dbccab4b1b10e055093',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, database};
