import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MaxExpensesProvider } from '../../providers/summary-services/max-expenses';

/**
 * Generated class for the MaxExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-max-expenses',
  templateUrl: 'max-expenses.html',
})
export class MaxExpensesPage {
  maxExpenses:any;

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public maxExp: MaxExpensesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaxExpensesPage');
    this.animateClass = { 'fade-in-right-item': true };


    let date = new Date;
    let datenow = date.getDate();
    console.log(datenow);
    
    
    this.maxExp.getMaxExpenses().then(data => {
      this.maxExpenses = data;
      console.log(this.maxExpenses);
      
    })
  }

}
