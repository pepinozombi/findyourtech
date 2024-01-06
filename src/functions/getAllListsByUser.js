import { app } from "../firebase/config";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";

const db = getFirestore(app);

export default async function getAllListsByUser(
    user
) {

    let clips = [];

    const ref = collection(db, "UserList");
    let qBase = query(ref);

    qBase = query(qBase, where('user', '==', user));

    qBase = query(qBase, orderBy('createdAt', 'desc'));

    const querySnapshot1 = await getDocs(qBase);
    const docs1 = querySnapshot1.docs;

    docs1.forEach((doc) => {
        clips.push({ id: doc.id, ...doc.data() });
    });

    return clips;
}