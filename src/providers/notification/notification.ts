import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: HttpClient,
              private localNotifications: LocalNotifications,
              private platform: Platform) {
    console.log('Hello NotificationProvider Provider');
  }

  notification(title,text){
    if(this.platform.is('android')){
      this.platform.ready().then(() => {
        this.localNotifications.schedule({
            title: title,
            text: text,
            trigger: {at: new Date(new Date().getTime() + 1000)},
            led: 'FF0000',
            sound: null
        });
      });
    }
    else{
          console.log('Not_Android');
          
        }
  }

}
