import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the IncomeServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DueDateByUserIdProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DueDateByUserIdProvider Provider');
  }

  getDueDate(){                        
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getDuedate?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('DueDateByUserIdProvider===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }

  getCreditCard1(){                         
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getCreditCard1?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('getCreditCard1===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }

  getCreditCard2(){                       
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getCreditCard2?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('getCreditCard2===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }

  getCreditCard3(){                         
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getCreditCard3?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('getCreditCard3===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }

  getCreditCard4(){                       
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getCreditCard4?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('getCreditCard4===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }

  getCreditCard5(){                        
    let user_id = localStorage.getItem("user_id");   
    let host = sessionStorage.getItem("host");         

    return new Promise(resolve=>{
        this.http.get(host+'/services/duedate/getCreditCard5?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('getCreditCard5===',data);
        
      }, err =>{
        console.error(err);      
        });
      }); 
  }
}
