import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import firebaseConfig from './firebaseConfig';

class Firebase {
    constructor() {
        this.app = app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        this.githubProvider = new app.auth.GithubAuthProvider();
    }

    googleLogin = async () => {
        await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
        return await this.auth.signInWithPopup(this.googleProvider);
    }

    facebookLogin = async () => {
        await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
        return await this.auth.signInWithPopup(this.facebookProvider);
    }

    githubLogin = async () => {
        await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
        return await this.auth.signInWithPopup(this.githubProvider);
    }

    logout = () => {
        return this.auth.signOut();
    }

    getUser = () => {
        return this.auth.currentUser;
    }

    addPost = post => {
        const user = this.getUser();
        if (user) {
            this.db.collection('posts').add({
                userId: user.uid,
                content: post,
                date: Date.now(),
                user: user.displayName,
            })
        }
    }

    addMeme = url => {
        const user = this.getUser();
        if (user) {
            this.db.collection('memes').add({
                userId: user.uid,
                url: url,
                date: Date.now()
            })
        }
    }

    getUserPosts = async callback => {
        const user = this.getUser();
        if (user) {
            const data = await this.db.collection('posts').where('userId', '==', user.uid).orderBy('date', 'desc').get();
            callback(data.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }));
        }
    }

    getUserMemes = async callback => {
        const user = this.getUser();
        if (user) {
            const data = await this.db.collection('memes').where('userId', '==', user.uid).get();
            callback(data.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }));
        }
    }

    getAllPosts = async callback => {
        const data = await this.db.collection('posts').orderBy('date', 'desc').get();
        callback(data.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }));
    }

    deletePost = async id => {
        await this.db.collection('posts').doc(id).delete();
    }

    updatePostById = async (id, content) => {
        await this.db.collection('posts').doc(id).update({ content: content });
    }
}

export default Firebase;