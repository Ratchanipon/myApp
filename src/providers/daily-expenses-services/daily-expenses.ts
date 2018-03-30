import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ExpensesServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DailyExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DailyExpensesProvider Provider');
  }

  getDailyExpenses(){                          // ดึงข้อมูลรายการรายจ่ายรายวัน
    let user_id = localStorage.getItem("user_id");    
    let host = sessionStorage.getItem("host");            
    
    //เดือนปัจจุบัน
    let month_n = parseInt(sessionStorage.getItem("month"));
    let month = month_n+1;

    return new Promise(resolve=>{
        this.http.get(host+'/services/dailyExpenses/getDailyExpenses?user_id='+user_id+'&mont'+month)
        .subscribe(data=>{
        resolve(data);      
        console.log('DailyExpenses++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
    
  }

}
