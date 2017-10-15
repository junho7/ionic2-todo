import { Component } from '@angular/core';
import { Data } from '../../providers/data';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddtodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtodo',
  templateUrl: 'addtodo.html',
})
export class AddtodoPage {

  todoForm: FormGroup;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , private fb: FormBuilder
    , private dataProvider: Data) {
    // this.dataProvider = dataProvider;
    this.todoForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(100)])],
      'description': ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtodoPage');
  }
  addToDo() {
    let date = new Date();
    let newDoc = {
      'name': this.todoForm.value.name,
      'description': this.todoForm.value.description,
      'createdTime': date.getTime()
    };
    //Add the to do using the data service
    this.dataProvider.addToDo(newDoc);
    //After the addition navigate to the list view
    this.navCtrl.popToRoot();

  }
}