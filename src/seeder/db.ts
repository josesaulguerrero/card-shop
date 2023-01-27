import { initializeApp } from 'firebase/app';
import {
	collection,
	doc,
	Firestore,
	getFirestore,
	setDoc,
} from 'firebase/firestore';

const getDbConnection = (): Firestore => {
	// Initialize Firebase
	const app = initializeApp({
		apiKey: 'AIzaSyDLIFXP9ydHaBBfXv5pEG9bQ4EqycxbFeg',
		authDomain: 'card-shop-a7bf4.firebaseapp.com',
		projectId: 'card-shop-a7bf4',
		storageBucket: 'card-shop-a7bf4.appspot.com',
		messagingSenderId: '987158835284',
		appId: '1:987158835284:web:2a50fcd6d81bd7b7e5fdc1',
	});
	// Initialize Cloud Firestore and get a reference to the service
	return getFirestore(app);
};

export const saveCards = (cards: { uid: string }[]) => {
	const db = getDbConnection();
	const collectionRef = collection(db, 'cards');

	cards.forEach(async (card) => {
		try {
			const docRef = doc(collectionRef, card.uid);
			await setDoc(docRef, card);
			console.log('Document written with ID: ', docRef.id);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	});
};
