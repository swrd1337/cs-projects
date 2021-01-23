import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    login = async (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    isVerified = () => {
        if (this.getUser()) {
            return this.auth.currentUser.emailVerified;
        }
    }

    googleLogin = () => {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    facebookLogin = () => {
        return this.auth.signInWithPopup(this.facebookProvider);
    }

    logout = () => {
        return this.auth.signOut();
    }

    reSend = () => {
        this.auth.currentUser.sendEmailVerification();
    }

    resetPassword = async (email) => {
        await this.auth.sendPasswordResetEmail(email);
    }

    register = async (name, email, password) => {
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.auth.currentUser.sendEmailVerification();
        return this.auth.currentUser.updateProfile({
            displayName: name,
        });
    }

    getUser = () => {
        return this.auth.currentUser;
    }

    addScore = score => {
        const user = this.getUser();
        if (user) {
            this.db.collection('scores').add({
                userId: user.uid,
                userName: user.displayName,
                score: score
            })
        }
    }

    getScores = async callback => {
        const data = await this.db.collection('scores').orderBy('score', 'desc').limit(5).get();
        callback(data.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }));
    }

    getCurrentUserScores = async callback => {
        const user = this.getUser();
        let uid;
        if (user) {
            uid = user.uid;
        } else {
            uid = JSON.parse(localStorage.getItem('authUser')).uid;
        }
        const data = await this.db.collection('scores').where('userId', '==', uid).orderBy('score', 'desc').limit(3).get();
        callback(data.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }));
    }
}

export default new Firebase();