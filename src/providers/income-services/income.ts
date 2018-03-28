import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the IncomeServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IncomeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello IncomeProvider Provider');
  }

  getIncome(){                          // ดึงข้อมูลรายการรายรับ
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         
    
    let month = sessionStorage.getItem('month');
    console.log(month);
    

    return new Promise(resolve=>{
        this.http.get(host+'/services/income/getIncome?user_id='+user_id+'&month='+month)
        .subscribe(data=>{
        resolve(data);      
        console.log('Income++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
    
  }
}
