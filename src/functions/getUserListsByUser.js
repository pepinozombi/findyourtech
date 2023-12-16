import { app } from "../firebase/config";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const db = getFirestore(app);

const getUserListsByUser = async (uniqueName, getLikeList) => {

    if (!uniqueName) { return; }
    // Consultar si el usuario ya existe en la colección userProps
    let lists = [];

    const collectionRef = collection(db, "UserList");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("user", "==", uniqueName));
    qUser = query(qUser, where("likeList", "==", getLikeList));

    try {
        const querySnapshot = await getDocs(qUser);

        if (!querySnapshot.empty) {
            // La lista existe, la devolvemos

            if (!querySnapshot.empty) {

                querySnapshot.forEach((doc) => {
                    lists.push({ id: doc.id, ...doc.data() });
                });

                return { status: 200, message: "OK", data: lists };
            } else {
                return { status: 404, message: "Not found", data: "No se encontraron listas" }
            }
        } else {
            return { status: 404, message: "Not found", data: "No se encontró la lista en la base de datos" }
        }
    } catch (error) {
        console.log('Error al verificar listas:', error);
        return { status: 500, message: "Server error", data: error }
    }
};

export default getUserListsByUser;