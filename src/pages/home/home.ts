import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Data} from '../../providers/data';
import {AddtodoPage} from '../addtodo/addtodo';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    // items: any;

    // constructor(private dataProvider: Data) {
    //     this.dataProvider = dataProvider;
    //     this.items = [];

    //     this.dataProvider.getDocuments().then((result) => {
    //         // console.log('getDocument');
    //         this.items = result;
    //         // console.log(this.items);
    //     });
    // }

    // addData() {

    //     console.log('addData');
    //     let date = new Date();

    //     let newDoc = {
    //         '_id': date,
    //         'message': date.getTime()
    //     };

    //     this.dataProvider.addDocument(newDoc);

    // }

    public toDos : any[];
    public noToDo : boolean;
    constructor(private todoService: Data, private navController: NavController, private platform: Platform) {
        this.navController = navController;
        this.platform.ready().then(() => {
            this.todoService.retrieveToDos().then(data => {
                this.toDos = data;
                if(this.toDos.length > 0 ) {
                  this.noToDo = false;
                }
                else {
                  this.noToDo = true;
                }
            })
            .catch(console.error.bind(console));
        });
    }
    
    showToDoPage() {
        this.navController.push(AddtodoPage);
    }
    
    delete(item) {
        this.todoService.deleteToDo(item);
    }

}
