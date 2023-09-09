//Firebase Dependencies
import firebaseAdmin from 'firebase-admin';
import serviceAccount from '../config/firebase_key.json';

const initiateFirebase = () => {
  try {
    return firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  } catch (err) {
    return firebaseAdmin.app();
  }
};

export default initiateFirebase;
