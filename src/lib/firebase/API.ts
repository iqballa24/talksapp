/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { auth, storage } from '@/lib/firebase';
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
  Timestamp,
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
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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
      about: 'Hey there! I am using TalksApp.',
    });

    await setDoc(doc(db, 'usersFriends', res.user.uid), {});

    await setDoc(doc(db, 'usersChats', res.user.uid), {});

    await setDoc(doc(db, 'usersGroups', res.user.uid), {});

    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
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
      throw new Error('Ops, something went wrong');
    }
  }
};

const getUserById = async (id: string) => {
  const data: DocumentData[] = [];

  try {
    const q = query(collection(db, 'users'), where('uid', '==', id));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }

  return data;
};

const getGroupById = async (id: string) => {
  const data: DocumentData = [];
  try {
    const q = query(collection(db, 'groups'), where('idGroup', '==', id));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
  return data;
};

const getDetailMember = async (member: string[]) => {
  try {
    return await Promise.all(
      member.map((item) => {
        const user = getUserById(item);
        return user;
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
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

const updateDocumentUsers = async (uid: string, data: DocumentData) => {
  const user = auth.currentUser!;

  try {
    const res = await setDoc(doc(db, 'users', uid), data, { merge: true });

    if (data.displayName) {
      await updateProfile(user, {
        displayName: data.displayName,
      });
    }

    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const uploadProfileImage = async ({ uid, displayName, file }: DocumentData) => {
  const storageRef = ref(storage, `${displayName + uid}`);
  const user = auth.currentUser!;

  try {
    const res = await uploadBytesResumable(storageRef, file).then(() => {
      return getDownloadURL(storageRef).then(async (downloadURL) => {
        await updateProfile(user, {
          photoURL: downloadURL,
        });
        await setDoc(
          doc(db, 'users', uid),
          { photoURL: downloadURL },
          { merge: true }
        );

        return downloadURL;
      });
    });
    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const uploadFile = async ({ file }: DocumentData) => {
  const storageRef = ref(storage, `${+new Date()}`);

  try {
    const res = await uploadBytesResumable(storageRef, file).then(() => {
      return getDownloadURL(storageRef).then((downloadURL) => {
        return downloadURL;
      });
    });

    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const acceptRequestFriend = async ({
  uid,
  displayName,
  photoURL,
}: DocumentData) => {
  const user = auth.currentUser!;
  const combineId = user.uid > uid ? user.uid + uid : uid + user.uid;

  try {
    await deleteRequestFriend(uid);
    await sendRequestFriend(uid, 'accepted');

    const res = await getDoc(doc(db, 'chats', combineId));

    if (!res.exists()) {
      await setDoc(doc(db, 'chats', combineId), { messages: [] });

      await updateDoc(doc(db, 'usersChats', user.uid), {
        [combineId + '.status']: 'active',
        [combineId + '.userInfo']: {
          uid,
          displayName,
          photoURL,
        },
        [combineId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'usersChats', uid), {
        [combineId + '.status']: 'active',
        [combineId + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combineId + '.date']: serverTimestamp(),
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const changeStatusChat = async (uid: string, status: string) => {
  const user = auth.currentUser!;
  const combineId = user.uid > uid ? user.uid + uid : uid + user.uid;

  try {
    await updateDoc(doc(db, 'usersChats', user.uid), {
      [combineId + '.status']: status,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const updateDocument = async ({ collection, data, id }: DocumentData) => {
  try {
    const res = await updateDoc(doc(db, collection, id), data);
    return res;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const sendRequestFriend = async (uid: string, status = 'pending') => {
  const user = auth.currentUser!;

  const dataCurrUser = {
    data: arrayUnion({
      userId: uid,
      requestBy: user.uid,
      status: status,
    }),
  };

  const ReqUser = {
    data: arrayUnion({
      userId: user.uid,
      requestBy: user.uid,
      status: status,
    }),
  };

  try {
    await updateDocument({
      collection: 'usersFriends',
      data: dataCurrUser,
      id: user.uid,
    });

    await updateDocument({
      collection: 'usersFriends',
      data: ReqUser,
      id: uid,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const deleteRequestFriend = async (uid: string) => {
  const user = auth.currentUser!;

  try {
    const getFriendsCurrUser = await getDoc(doc(db, 'usersFriends', user.uid));
    const dataDeleteCurrUser = getFriendsCurrUser
      .data()
      ?.data.filter((item: DocumentData) => item.userId === uid);

    const getFriendsUser = await getDoc(doc(db, 'usersFriends', uid));
    const dataDeleteUser = getFriendsUser
      .data()
      ?.data.filter((item: DocumentData) => item.userId === user.uid);

    await updateDocument({
      collection: 'usersFriends',
      data: {
        data: arrayRemove(dataDeleteCurrUser[0]),
      },
      id: user.uid,
    });

    await updateDocument({
      collection: 'usersFriends',
      data: {
        data: arrayRemove(dataDeleteUser[0]),
      },
      id: uid,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const createGroup = async ({ subject, description, photo }: DocumentData) => {
  const user = auth.currentUser!;
  const id = uuidv4();
  const storageRef = ref(storage, `${subject + id}`);

  try {
    await uploadBytesResumable(storageRef, photo).then(() => {
      return getDownloadURL(storageRef).then(async (downloadURL) => {
        await setDoc(doc(db, 'groups', id), {
          idGroup: id,
          subject,
          description,
          photoURL: downloadURL,
          member: [user.uid],
          createdBy: user.uid,
          createdAt: serverTimestamp(),
        });

        await setDoc(doc(db, 'usersGroups', user.uid), {});

        await updateDoc(doc(db, 'usersGroups', user.uid), {
          [id + '.idGroup']: id,
          [id + '.invitedBy']: user.uid,
          [id + '.status']: 'accept',
          [id + '.date']: serverTimestamp(),
          [id + '.lastMessage']: '',
        });

        await setDoc(doc(db, 'chats', id), { messages: [] });
      });
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const sendRequestMember = async ({ uid, idGroup, data }: DocumentData) => {
  const user = auth.currentUser!;

  try {
    await setDoc(doc(db, 'groups', idGroup), data, {
      merge: true,
    });

    await setDoc(doc(db, 'usersGroups', uid), {});

    await updateDoc(doc(db, 'usersGroups', uid), {
      [idGroup + '.idGroup']: idGroup,
      [idGroup + '.invitedBy']: user.uid,
      [idGroup + '.status']: 'pending',
      [idGroup + '.date']: serverTimestamp(),
      [idGroup + '.lastMessage']: '',
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const sendMessagePersonal = async ({
  text,
  chatId,
  senderId,
  receiverId,
  image,
}: DocumentData) => {
  const id = +new Date();
  const date = Timestamp.now();

  try {
    if (image) {
      const res = await uploadFile({ file: image });

      const data = {
        messages: arrayUnion({
          id,
          text,
          senderId,
          date,
          image: res,
        }),
      };

      await updateDocument({ collection: 'chats', data, id: chatId });
    } else {
      const data = {
        messages: arrayUnion({
          id,
          text,
          senderId,
          date,
        }),
      };

      await updateDocument({ collection: 'chats', data, id: chatId });
    }
    await updateDocument({
      collection: 'usersChats',
      data: {
        [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
        [chatId + '.date']: serverTimestamp(),
      },
      id: senderId,
    });

    await updateDocument({
      collection: 'usersChats',
      data: {
        [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
        [chatId + '.date']: serverTimestamp(),
      },
      id: receiverId,
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

const sendMessageGroup = async ({
  text,
  chatId,
  senderId,
  image,
  member,
}: DocumentData) => {
  const id = +new Date();
  const date = Timestamp.now();

  try {
    if (image) {
      const res = await uploadFile({ file: image });

      const data = {
        messages: arrayUnion({
          id,
          text,
          senderId,
          date,
          image: res,
        }),
      };

      await updateDocument({ collection: 'chats', data, id: chatId });
    } else {
      const data = {
        messages: arrayUnion({
          id,
          text,
          senderId,
          date,
        }),
      };

      await updateDocument({ collection: 'chats', data, id: chatId });
    }

    for (let idx = 0; idx < member.length; idx++) {
      await updateDocument({
        collection: 'usersGroups',
        data: {
          [chatId + '.lastMessage']: text === '' ? 'Send image' : text,
          [chatId + '.date']: serverTimestamp(),
        },
        id: member[idx],
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      console.log(err);
      throw new Error('Ops, something went wrong');
    }
  }
};

export {
  registerUser,
  loginUser,
  getUserByUserName,
  onAuthStateChanged,
  signOut,
  getUserById,
  updateDocumentUsers,
  uploadProfileImage,
  acceptRequestFriend,
  updateDocument,
  deleteRequestFriend,
  sendRequestFriend,
  changeStatusChat,
  uploadFile,
  createGroup,
  getGroupById,
  getDetailMember,
  sendRequestMember,
  sendMessagePersonal,
  sendMessageGroup
};
