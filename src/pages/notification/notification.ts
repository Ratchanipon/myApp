import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DueDateByUserIdProvider } from '../../providers/due-date-services/get-duedate';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  date = new Date;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public noti: NotificationProvider,
              public dueDate: DueDateByUserIdProvider) {

                this.dueDate.getDueDate().then((data:any) => {
                  let duedate = data;
                  
                  this.dueDate.getCreditCard1().then((data:any) => {
                    let credit_card1 = data;
                    
                    this.dueDate.getCreditCard2().then((data:any) => {
                      let credit_card2 = data; 

                      this.dueDate.getCreditCard3().then((data:any) => {
                        let credit_card3 = data;  
                        
                        this.dueDate.getCreditCard4().then((data:any) => {
                          let credit_card4 = data;

                          this.dueDate.getCreditCard5().then((data:any) => {
                            let credit_card5 = data;
                            this.notification(duedate, credit_card1, credit_card2, credit_card3, credit_card4, credit_card5);
                          });
                        });
                      });
                    });
                  });
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  notification(duedate, credit_card1, credit_card2, credit_card3, credit_card4, credit_card5){
    
    let day = this.date.getDate();
    let hours = this.date.getHours();
    let hoursFix:number = 14;

    let water = JSON.parse(duedate.water);
    let electricity = JSON.parse(duedate.electricity);
    let internet = duedate.internet;
    let telephone = duedate.telephone;

    let credit1 = credit_card1.credit_card;
    console.log("water--",water);
    console.log("day--",day);
    
    let creditName1 = JSON.stringify(credit_card1.credit);
    console.log(creditName1);
    
    let credit2 = credit_card2.credit_card;
    let creditName2 = credit_card2.credit;
    let credit3 = credit_card3.credit_card;
    let creditName3 = credit_card3.credit;
    let credit4 = credit_card4.credit_card;
    let creditName4 = credit_card4.credit;
    let credit5 = credit_card5.credit_card;
    let creditName5 = credit_card5.credit;
  
    // if((day = water) && (hours = 15)){
    //   this.noti.notificationService('ครบกำหนดชำระค่าน้ำ','คุณมีกำนดชำระค่าน้ำวันนี้');
    // }
    // if((day = electricity) && (hours = 15)){
    //   this.noti.notificationService('ครบกำหนดชำระค่าไฟฟ้า','คุณมีกำนดชำระค่าไฟฟ้าวันนี้');
    // }
    // if((day = internet) && (hours = hoursFix)){
    //   this.noti.notificationService('ครบกำหนดชำระค่าบริการอินเทอร์เน็ต','คุณมีกำนดชำระค่าบริการอินเทอร์เน็ตวันนี้');
    // }
    // if((day = telephone) && (hours = hoursFix)){
    //   this.noti.notificationService('ครบกำหนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้าน','คุณมีกำนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้านวันนี้');
    // }

    // if((day = credit1) && (hours = hoursFix)){
    //   this.noti.notificationService('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าชำระค่าบัตรเครดิต '+creditName1+'วันนี้');
    // }

  }

}
