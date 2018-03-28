import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FixedExpensesServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixedExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FixedExpensesProvider Provider');
  }

  getFixedExpenses(){                          // ดึงข้อมูลรายการรายจ่ายคงที่
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host");                            

    return new Promise(resolve=>{
        this.http.get(host+'/services/fixedExpenses/getFixedExpenses?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log(data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
    
  }

}
