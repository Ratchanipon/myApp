import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RiskServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Risk1Provider {

  constructor(public http: HttpClient) {
    console.log('Hello RiskServicesProvider Provider');
  }

  getRisk1(){                                                               //ดึงข้อมูลความเสี่ยง-->ดีมาก
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/risk/getRisk1')
        .subscribe(data=>{
        resolve(data);      
        console.log(data);
        
      }, err =>{
        console.error(err);      
        });
      });     
    
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
  getRisk3(){                                                               //ดึงข้อมูลความเสี่ยง-->เสี่ยง
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/risk/getRisk3')
        .subscribe(data=>{
        resolve(data);      
        console.log('getRisk3++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });     
    
  }
  getRisk4(){                                                               //ดึงข้อมูลความเสี่ยง-->เสี่ยงมาก
    let host = sessionStorage.getItem("host");

    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/risk/getRisk4')
        .subscribe(data=>{
        resolve(data);      
        console.log('getRisk4++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });     
    
  }

}
