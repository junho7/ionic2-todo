import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BrowserModule } from '@angular/platform-browser';

@Injectable()
export class Data {

    db: any;
    username: any;
    password: any;
    remote: any;
    data: any;
    private toDos = [];

    constructor(public http: Http) {
        console.log('Hello Data Provider');

        this.db = new PouchDB('tododb');
        console.log("adapter"+this.db.adapter);
        this.username = 'ctesemeradessomelightley';
        this.password = '688710f0613b5fd6ad97178bef87f3ffbdd2da01';
        // this.remote = '/pouchdb';
        this.remote = 'https://777e8289-0cc9-461e-ae62-9938ac27b339-bluemix.cloudant.com/tododb';


        let options = {
            live: true,
            retry: true,
            continuous: true,
            auth: {
                username: this.username,
                password: this.password
            }
        };

        this.db.sync(this.remote, options);


    }

    // addDocument(doc) {
    //     this.db.put(doc);
    // }

    // getDocuments() {

    //     return new Promise(resolve => {
    //         this.db.allDocs({
    //             include_docs: true
    //         }).then((result) => {
    //             // console.log('result'+result);
    //             this.data = [];
    //             result.rows.map((row) => {
    //                 this.data.push(row.doc);
    //                 console.log(row.doc);
    //                 resolve(this.data);
    //             });
    //             this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
    //                 this.handleChange(change);
    //             });

    //         }).catch((error) => {
    //             console.log(error);
    //         });

    //     });

    // }

    // handleChange(change) {

    //     let changedDoc = null;
    //     let changedIndex = null;

    //     this.data.forEach((doc, index) => {

    //         if (doc._id === change.id) {
    //             changedDoc = doc;
    //             changedIndex = index;
    //         }

    //     });

    //     //A document was deleted
    //     if (change.deleted) {
    //         this.data.splice(changedIndex, 1);
    //     }
    //     else {

    //         //A document was updated
    //         if (changedDoc) {
    //             this.data[changedIndex] = change.doc;
    //         }
    //         //A document was added
    //         else {
    //             this.data.push(change.doc);
    //         }

    //     }

    // }
    addToDo(doc) {
        return this.db.post(doc);
    }
    
    deleteToDo(doc) {
        return this.db.remove(doc);
    }
    
    retrieveToDos(){
        return new Promise<any>(resolve => {
    
            this.db.allDocs({include_docs: true}).then((result) => {
                if (result.total_rows > 0)
                {
                    result.rows.map((row) => {
                        this.toDos.push(row.doc);
                        resolve(this.toDos);
                    });
                }
                else {
                    resolve(this.toDos);
                }
                this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
                    this.onChange(change);
                });
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    
    onChange(change){
        let changedDoc = null;
        let changedIndex = null;
        this.toDos.forEach((doc, index) => {
            if(doc._id === change.id){
                changedDoc = doc;
                changedIndex = index;
            }
        });
    
        //Handle deleted document
        if(change.deleted){
            this.toDos.splice(changedIndex, 1);
        }
        else {
            //Handle the updates
            if(changedDoc){
                this.toDos[changedIndex] = change.doc;
            }
            //Handle additions
            else {
                this.toDos.push(change.doc);
            }
        }
    }
}





