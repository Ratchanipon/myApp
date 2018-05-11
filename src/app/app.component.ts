import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DispensableExpensesPage } from '../pages/dispensable-expenses/dispensable-expenses';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationProvider } from '../providers/notification/notification';
import { DueDateByUserIdProvider } from '../providers/due-date-services/get-duedate';
import { NotificationPage } from '../pages/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "FhcInstantPage";

  pages: Array<{title: string, component: any}>;

  email: string;    
  
  date = new Date;
  month = this.date.getMonth().toString();
  year = this.date.getFullYear().toString();

  host: string = "http://anusit-not.esy.es/AppManagement";
  // host: string = "http://localhost/AppManagement";
  // host: string = "http://chinhosting.com/web/AppManagement"

  // host: string = "http://172.19.100.83/AppManagement"
  

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public actionSheetCtrl: ActionSheetController,
              private localNotifications: LocalNotifications,
              public splashScreen: SplashScreen,
              public noti: NotificationProvider,
              public dueDate: DueDateByUserIdProvider,
              ) {


        // this.notification();
        
        sessionStorage.setItem("host",this.host);
        sessionStorage.setItem("month",this.month);
        sessionStorage.setItem("year",this.year);

    this.user_id = localStorage.getItem("user_id");
    this.user_id != null?this.rootPage = "HomePage":this.rootPage = "IndexPage";

    this.email = localStorage.getItem("email");

    this.initializeApp();

    // used for an example of ngFor and navigation
    // this.pages = [
    //   { title: 'รายรับ', component: 'IncomePage'},
    //   { title: 'รายจ่ายรายวัน', component: 'DailyExpensesPage'},
    //   { title: 'รายจ่ายคงที่', component: 'FixedExpensesPage'}
    // ];
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

  initializeApp() {
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.email = localStorage.getItem("email");
      
    });

  }

  notification(duedate, credit_card1, credit_card2, credit_card3, credit_card4, credit_card5){
    
    let day = this.date.getDate();
    let hours = this.date.getHours();
    let hoursFix:number = 17;

    console.log(hoursFix);
    

    // let water:number = JSON.parse(duedate.water);
    // let electricity:number = JSON.parse(duedate.electricity);
    // let internet:number = JSON.parse(duedate.internet);
    // let telephone:number = JSON.parse(duedate.telephone);

    // let credit1 = credit_card1.credit_card;
    // let creditName1 = credit_card1.credit;
    // let credit2 = credit_card2.credit_card;
    // let creditName2 = credit_card2.credit;
    // let credit3 = credit_card3.credit_card;
    // let creditName3 = credit_card3.credit;
    // let credit4 = credit_card4.credit_card;
    // let creditName4 = credit_card4.credit;
    // let credit5 = credit_card5.credit_card;
    // let creditName5 = credit_card5.credit;
  
    // if((day = water) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าน้ำ','คุณมีกำนดชำระค่าน้ำวันนี้');
    // }

    // if((day = electricity) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าไฟฟ้า','คุณมีกำนดชำระค่าไฟฟ้าวันนี้');
    // }

    // if((day = internet) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบริการอินเทอร์เน็ต','คุณมีกำนดชำระค่าบริการอินเทอร์เน็ตวันนี้');
    // }
    // if((day = telephone) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้าน','คุณมีกำนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้านวันนี้');
    // }

    // if((day = credit1) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName1+'วันนี้');
    // }
    // if((day = credit2) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName2+'วันนี้');
    // }
    // if((day = credit3) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName3+'วันนี้');
    // }
    // if((day = credit4) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName4+'วันนี้');
    // }
    // if((day = credit5) && (hours = hoursFix)){
    //   this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName5+'วันนี้');
    // }

  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.rootPage= page.component;
  }

  logOut1() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'exit',
          text: 'ออกจากระบบ',
          handler: () => {
            localStorage.clear();
            this.rootPage = "IndexPage";
          }
        },
        {
          icon: 'close-circle',
          text: 'ยกเลิก',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
  
  HomePage(){
    this.rootPage = "HomePage";
  }
  IncomePage(){
    this.rootPage = "IncomePage";
  }
  DailyExpensesPage(){
    this.rootPage = "DailyExpensesPage";
  }
  FixedExpensesPage(){
    this.rootPage = "FixedExpensesPage";
  }

  SummaryPage(){
    this.rootPage = "SummaryPage";
  }
  ShowRisk2Page(){
    this.rootPage = "ShowRisk2Page";
  }
  ChartPage(){
    this.rootPage = "ChartPage";
  }

  setting() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          icon: 'contact',
          text: 'ข้อมูลของฉัน',
          handler: () => {
            this.rootPage = "ProfilePage";
          }
        },
        {
          icon: 'ios-calendar-outline',
          text: 'กำหนดชำระรายจ่ายคงที่',
          handler: () => {
            this.rootPage = "ShowDueDatePage";
          }
        },
        {
          icon: 'notifications-outline',
          text: 'การแจ้งเตือน',
          handler: () => {

            this.rootPage = "NotificationPage";
          }
        },
        {
          icon: 'close-circle',
          text: 'ยกเลิก',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
}
