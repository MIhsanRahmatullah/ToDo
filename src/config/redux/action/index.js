import firebase, {database}from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getDatabase, set, ref, push, onValue, remove } from "firebase/database";

export const actionUserName = () => (dispatch) => {
    setTimeout(()=>{
        return dispatch({type:"CHANGE_USER", value:"Jek"});
    },2000)  
}

export const registerUserAPI =(data) => (dispatch) =>{
    const auth = getAuth();
    return new Promise((resolve, reject)=>{
        dispatch({type: 'CHANGE_LOADING', value: true});
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log('Register success', userCredential);
                // Signed in 
                const user = userCredential.user;
                // ...
                dispatch({type: 'CHANGE_LOADING', value: false});
                resolve(true); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
                dispatch({type: 'CHANGE_LOADING', value: false});
                reject(false);
            })    
    })
}

export const loginUserAPI =(data) => (dispatch) =>{
    const auth = getAuth();
    return new Promise((resolve, reject)=>{
        dispatch({type: 'CHANGE_LOADING', value: true});
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                const dataUser= {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                    refreshToken: user.refreshToken
                }
                dispatch({type: 'CHANGE_LOADING', value: false});
                dispatch({type: 'CHANGE_ISLOGIN', value: true});
                dispatch({type: 'CHANGE_USER', value: dataUser });
                resolve(dataUser); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
                dispatch({type: 'CHANGE_ISLOGIN', value: false});
                reject(false);
            })    
    })
}

export const addDataToAPI = (data) => (dispatch) =>{
    const db = getDatabase();
    push(ref(db, 'notes/' + data.userId), {
        title: data.title,
        content: data.content,
        hours: data.hours,
        minuts: data.minuts,
        date: data.date,
        day: data.day,
        year: data.year
    })
}

export const getDataFromAPI = (userId) => (dispatch) =>{
    const urlNotes = ref(database,'notes/' + userId);
    return new Promise((resolve,reject)=>{
        onValue(urlNotes, (snapshot) => {
            console.log('Get Data',snapshot.val())
            const data = [];
            Object.keys(snapshot.val()).map(key =>{
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            })
            dispatch({type: 'SET_NOTES', value: data})
            resolve(snapshot.val())
        })
    })
}

export const updateDataFromAPI = (data) => (dispatch) =>{
    const urlNotes = ref(database,'notes/' + `${data.userId}/${data.noteId}`);
    return new Promise((resolve,reject)=>{
        set(urlNotes, {
            title: data.title,
            content: data.content,
            hours: data.hours,
            minuts: data.minuts,
            date: data.date,
            day: data.day,
            year: data.year
          })
          .then(() => {
            // Data saved successfully!
            resolve(true)
          })
          .catch((error) => {
            // The write failed...
            reject(false)
          });
    })
}

export const deleteDataFromAPI = (data) => (dispatch) =>{
    const urlNotes = ref(database,'notes/' + `${data.userId}/${data.noteId}`);
    return new Promise((resolve,reject)=>{
        remove(urlNotes)
    })
}