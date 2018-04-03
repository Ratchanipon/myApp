import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RiskServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Risk2Provider {

  constructor(public http: HttpClient) {
    console.log('Hello RiskServicesProvider Provider');
  }

  getRisk2(){                                                               //ดึงข้อมูลความเสี่ยง-->ปานกลาง
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/risk/getRisk2')
        .subscribe(data=>{
        resolve(data);      
        console.log('getRisk2++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });     
    
  }


}
