import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  arrayUnion,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Sign in
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        userName: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Register
const registerWithEmailAndPassword = async (userName, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      userName,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Password Reset
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  signOut(auth);
};

const createUser = async (userName, currentDate, status) => {
  try {
    const userData = {
      userName,
      currentDate,
      status,
    };

    const userRef = await addDoc(collection(db, "allUsers"), userData);

    return userRef.id;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

const updateTask = async (userId, updatedData) => {
  try {
    const userRef = doc(db, "allUsers", userId);
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, "allUsers", userId);
    await deleteDoc(userRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const getAllUsers = async (filters = {}) => {
  try {
    const taskCollection = collection(db, "allUsers");
    let queryRef = query(taskCollection);

    const taskSnapshot = await getDocs(queryRef);
    const users = taskSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const taskDoc = doc(db, "allUsers", userId);
    const taskSnapshot = await getDoc(taskDoc);

    if (taskSnapshot.exists()) {
      return { id: taskSnapshot.id, ...taskSnapshot.data() };
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  createUser,
  updateTask,
  deleteUser,
  getAllUsers,
  getUserById,
};
