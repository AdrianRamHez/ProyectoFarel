import app from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCgXsdCg4kI3YbXKEq3nkziDxgiUek0IDg",
    authDomain: "farel-91d78.firebaseapp.com",
    databaseURL: "https://farel-91d78.firebaseio.com",
    projectId: "farel-91d78",
    storageBucket: "farel-91d78.appspot.com",
    messagingSenderId: "1031275345761",
    appId: "1:1031275345761:web:416ce0db2eab360efdb720"
  };

class Firebase{

    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        this.authorization = app.auth;

        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos){
            var ref=this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot =>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }
    }

    estaIniciado(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento = documento => this.storage.ref().child(documento).delete();
}

export default Firebase;