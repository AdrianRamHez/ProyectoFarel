export const obtenerData = (firebase, paginaSize, casaInicial, texto) => {
    return new Promise(async (resolver, eject)=>{
        let incursos = firebase.db
        .collection("Incursos")
        .where("propietario", "==",firebase.auth.currentUser.uid)
        .orderBy("curso")
        .limit(paginaSize);

        if(casaInicial !== null){
            incursos = firebase.db
                .collection("Incursos")
                .where("propietario", "==",firebase.auth.currentUser.uid)
                .orderBy("curso")
                .startAfter(casaInicial)
                .limit(paginaSize);

            if(texto.trim() !== ""){
                incursos = firebase.db
                    .collection("Incursos")
                    .where("propietario", "==",firebase.auth.currentUser.uid)
                    .orderBy("curso")
                    .where("keywords", "array-contains", texto.toLowerCase())
                    .startAfter(casaInicial)
                    .limit(paginaSize);
            }
        }

        const snapshot = await incursos.get();

        const arrayIncursos = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const inicialValor = snapshot.docs[0];
        const finalValor = snapshot.docs[snapshot.docs.length -1];

        const returnValue = {
            arrayIncursos,
            inicialValor,
            finalValor
        }

        resolver(returnValue);
    })
}


export const obtenerDataAnterior = (firebase, paginaSize, casaInicial, texto) => {
    return new Promise(async (resolver, eject)=>{
        let incursos = firebase.db
        .collection("Incursos")
        .where("propietario", "==",firebase.auth.currentUser.uid)
        .orderBy("curso")
        .limit(paginaSize);

        if(casaInicial !== null){
            incursos = firebase.db
                .collection("Incursos")
                .where("propietario", "==",firebase.auth.currentUser.uid)
                .orderBy("curso")
                .startAt(casaInicial)
                .limit(paginaSize);

            if(texto.trim() !== ""){
                incursos = firebase.db
                    .collection("Incursos")
                    .where("propietario", "==",firebase.auth.currentUser.uid)
                    .orderBy("curso")
                    .where("keywords", "array-contains", texto.toLowerCase())
                    .startAt(casaInicial)
                    .limit(paginaSize);
            }
        }

        const snapshot = await incursos.get();

        const arrayIncursos = snapshot.docs.map(doc => {
            let data = doc.data();
            let id = doc.id;
            return {id, ...data}
        })

        const inicialValor = snapshot.docs[0];
        const finalValor = snapshot.docs[snapshot.docs.length -1];

        const returnValue = {
            arrayIncursos,
            inicialValor,
            finalValor
        }

        resolver(returnValue);
    })
}