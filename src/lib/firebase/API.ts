import { auth } from '@/lib/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { db } from '@/lib/firebase';
import { registerTypes, FormLoginTypes } from '@/lib/types/index';

const registerUser = async ({ email, password, username }: registerTypes) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(res.user);

    await updateProfile(res.user, {
      displayName: username,
    });

    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      displayName: username,
      email,
      photoURL: '',
      about: 'Hey theree! I am using TalksApp.',
    });

    await setDoc(doc(db, 'usersChats', res.user.uid), {});

    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Something went wrong');
    }
  }
};

const loginUser = async ({ email, password }: FormLoginTypes) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const res = await signInWithEmailAndPassword(auth, email, password);

    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Something went wrong');
    }
  }
};

const getUserByUserName = async (userName: string) => {
  const data: DocumentData[] = [];
  let error = false;

  try {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', userName)
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (err) {
    console.log(err);
    error = true;
  }

  return { data, error };
};

export {
  registerUser,
  loginUser,
  getUserByUserName,
  onAuthStateChanged,
  signOut,
};
