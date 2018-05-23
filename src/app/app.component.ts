import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController, AlertController } from 'ionic-angular';
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
import { DeleteUserProvider } from '../providers/user-service/delete-users';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "IndexPage";

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
              public alertCtrl: AlertController,
              public statusBar: StatusBar,
              public actionSheetCtrl: ActionSheetController,
              private localNotifications: LocalNotifications,
              public splashScreen: SplashScreen,
              public noti: NotificationProvider,
              public dueDate: DueDateByUserIdProvider,
              public deleteUser: DeleteUserProvider
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

    let day = this.date.getDate();
    let hours = this.date.getHours();
    let hoursFix:number = 17;

    if(this.user_id != null){
    this.dueDate.getDueDate().then((data:any) => {
      let duedate = data;
      let water:number = duedate.water;
      let electricity:number = duedate.electricity;
      let internet:number = duedate.internet;
      let telephone:number = duedate.telephone;
      if((day = water*1) && (hours = hoursFix)){
      this.noti.notification('ครบกำหนดชำระค่าน้ำ','คุณมีกำนดชำระค่าน้ำวันนี้');
      }

      if((day = electricity*1) && (hours = hoursFix)){
        this.noti.notification('ครบกำหนดชำระค่าไฟฟ้า','คุณมีกำนดชำระค่าไฟฟ้าวันนี้');
      }
  
      if((day = internet*1) && (hours = hoursFix)){
        this.noti.notification('ครบกำหนดชำระค่าบริการอินเทอร์เน็ต','คุณมีกำนดชำระค่าบริการอินเทอร์เน็ตวันนี้');
      }
      if((day = telephone*1) && (hours = hoursFix)){
        this.noti.notification('ครบกำหนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้าน','คุณมีกำนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้านวันนี้');
      }

      this.dueDate.getCreditCard1().then((data:any) => {
        let credit_card1 = data;
        let credit1 = credit_card1.credit_card;
        let creditName1 = credit_card1.credit;
        if((day = credit1*1) && (hours = hoursFix)){
          this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName1+'วันนี้');
        }

        this.dueDate.getCreditCard2().then((data:any) => {
          let credit_card2 = data; 
          let credit2 = credit_card2.credit_card;
          let creditName2 = credit_card2.credit;
          if((day = credit2*1) && (hours = hoursFix)){
            this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName2+'วันนี้');
          }

          this.dueDate.getCreditCard3().then((data:any) => {
            let credit_card3 = data;  
            let credit3 = credit_card3.credit_card;
            let creditName3 = credit_card3.credit;
            if((day = credit3*1) && (hours = hoursFix)){
              this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName3+'วันนี้');
            }
            
            this.dueDate.getCreditCard4().then((data:any) => {
              let credit_card4 = data;
              let credit4 = credit_card4.credit_card;
              let creditName4 = credit_card4.credit;
              if((day = credit4*1) && (hours = hoursFix)){
                this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName4+'วันนี้');
              }

              this.dueDate.getCreditCard5().then((data:any) => {
                let credit_card5 = data;
                let credit5 = credit_card5.credit_card;
                let creditName5 = credit_card5.credit;
                if((day = credit5*1) && (hours = hoursFix)){
                  this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName5+'วันนี้');
                }

                // this.notification(duedate, credit_card1, credit_card2, credit_card3, credit_card4, credit_card5);
              });
            });
          });
        });
      });
    });
    }
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

  // notification(duedate, credit_card1, credit_card2, credit_card3, credit_card4, credit_card5){
    
  //   let day = this.date.getDate();
  //   let hours = this.date.getHours();
  //   let hoursFix:number = 17;

  //   console.log(hoursFix);
    

  //   let water:number = duedate.water;
  //   let electricity:number = duedate.electricity;
  //   let internet:number = duedate.internet;
  //   let telephone:number = duedate.telephone;

  //   let credit1 = credit_card1.credit_card;
  //   let creditName1 = credit_card1.credit;
  //   let credit2 = credit_card2.credit_card;
  //   let creditName2 = credit_card2.credit;
  //   let credit3 = credit_card3.credit_card;
  //   let creditName3 = credit_card3.credit;
  //   let credit4 = credit_card4.credit_card;
  //   let creditName4 = credit_card4.credit;
  //   let credit5 = credit_card5.credit_card;
  //   let creditName5 = credit_card5.credit;
  
  //   if((day = water*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าน้ำ','คุณมีกำนดชำระค่าน้ำวันนี้');
  //   }

  //   if((day = electricity*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าไฟฟ้า','คุณมีกำนดชำระค่าไฟฟ้าวันนี้');
  //   }

  //   if((day = internet*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบริการอินเทอร์เน็ต','คุณมีกำนดชำระค่าบริการอินเทอร์เน็ตวันนี้');
  //   }
  //   if((day = telephone*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้าน','คุณมีกำนดชำระค่าบริการโทรศัพท์มือถือ/โทรศัพท์บ้านวันนี้');
  //   }

  //   if((day = credit1*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName1+'วันนี้');
  //   }
  //   if((day = credit2*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName2+'วันนี้');
  //   }
  //   if((day = credit3*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName3+'วันนี้');
  //   }
  //   if((day = credit4*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName4+'วันนี้');
  //   }
  //   if((day = credit5*1) && (hours = hoursFix)){
  //     this.noti.notification('ครบกำหนดชำระค่าบัตรเครดิต','คุณมีกำนดชำระค่าบัตรเครดิต '+creditName5+'วันนี้');
  //   }

  // }



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
        // {
        //   icon: 'notifications-outline',
        //   text: 'การแจ้งเตือน',
        //   handler: () => {

        //     this.rootPage = "NotificationPage";
        //   }
        // },
        {
          icon: 'trash',
          text: 'ลบบัญชีผู้ใช้',
          handler: () => {
            this.DeleteUserConfirm();
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

  DeleteUserConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'คุณต้องการจะลบบัญชีใช่หรือไม่',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'ไม่ใช่',
          handler: () => {
          
          }
        },
        {
          text: 'ใช่',
          handler: () => {
            this.deleteUser.deleteUser();
            localStorage.clear();
            this.rootPage = "IndexPage";
          }
        }
      ]
    });
    confirm.present();
  }
}
