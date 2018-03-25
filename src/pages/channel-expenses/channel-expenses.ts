import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChannelExpensesProvider } from '../../providers/summary-services/channel-expenses';

/**
 * Generated class for the ChannelExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-expenses',
  templateUrl: 'channel-expenses.html',
})
export class ChannelExpensesPage {
  channelExpenses:any;

  animateClass:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public channelExp: ChannelExpensesProvider) {

        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelExpensesPage');
    this.animateClass = { 'fade-in-right-item': true };

    
    this.channelExp.getChannelExpenses().then(data => {
      this.channelExpenses = data;
      console.log(this.channelExpenses);
      
    })
  }
}
