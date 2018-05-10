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
              public dueDate: DueDateByUserIdProvider) {


        this.notification();
        
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

  }

  initializeApp() {
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.email = localStorage.getItem("email");
      
    });

    this.dueDate.getCreditCard1().then(data => {
      console.log("water===");
    })

  }

  notification(){

      let day = this.date.getDate();
      let hours = this.date.getHours();

      console.log(hours);
    
      if((day = 10) && (hours = 7)){
        this.noti.notificationService('ครบกำหนดชำระค่าน้ำ','คุณมีกำนดชำระค่าน้ำวันนี้');
      }
      if((day = 10) && (hours = 7)){
        this.noti.notificationService('ค่าน้ำ','กดทหดหกดหดหด');
      }

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
          text: 'วันที่ครบกำหนดชำระ',
          handler: () => {
            this.rootPage = "DueDatePage";
          }
        },
        {
          icon: 'notifications-outline',
          text: 'การแจ้งเตือน',
          handler: () => {

            this.rootPage = "ProfilePage";
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
