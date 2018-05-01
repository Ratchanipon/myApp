import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailIncomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-income',
  templateUrl: 'detail-income.html',
})
export class DetailIncomePage {

  data:any;

  category:string;
  amount:string;
  created:string;
  images:string="";

  animateClass:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.data = this.navParams.data;

    this.category = this.data.category;
    this.amount = this.data.amount;
    this.created = this.data.created;
    this.images = this.data.images;
  }

  ionViewDidLoad() {

    this.animateClass = { 'fade-in-item': true };

    console.log('ionViewDidLoad DetailIncomePage');
  }

}
