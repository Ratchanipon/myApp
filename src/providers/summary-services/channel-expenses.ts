import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the CateCraditCardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChannelExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ChannelExpensesProvider Provider');
  }

  getChannelExpenses(){                          // ดึงข้อมูลยอดรวมรายจ่ายแต่ละช่องทาง
    let user_id = localStorage.getItem("user_id"); 
    let host = sessionStorage.getItem("host"); 
    
    return new Promise(resolve=>{
        this.http.get(host+'/AppManagement/services/summary/getChannelExpenses?user_id='+user_id)
        .subscribe(data=>{
        resolve(data);      
        console.log('ChannelExpenses++++++'+data);
        
      }, err =>{
        console.error(err);      
        });
      });
    
    // return this.http.get('http://localhost/AppManagement/services/category/getCateCraditCard').subscribe(data=>{
    //   console.log(data);      
    
  }

//   getChannelExpenses(channelExpenses:ChannelExpenses){
//     let user_id = localStorage.getItem("user_id");
//     /* return new Promise(resolve=>{
//     this.http.get('http://localhost/AppManagement/services/users/getUserById?username='+user.username+'&password='+user.password)
//     .subscribe(data=>{
//       resolve(data);      
//     }, err =>{
//       console.error(err);      
//       });
//     }); */
//     return new Promise<ChannelExpenses>(resolve=>{
//       this.http.get('http://localhost/AppManagement/services/summary/getChannelExpenses?user_id='+user_id)
//       .subscribe(channelExpenses=>{
        
//         let data = this.extacObject(channelExpenses);
//         resolve(data);
//       })
//     });
    
    
//     // return this.http.get('http://localhost/AppManagement/services/users/getUserById?username='+user.username+'&password='+user.password);
// }


// extacObject(data){
//   let json = JSON.stringify(data);
//   //console.log(json);
//   let obj = JSON.parse(json);
//   //console.log(obj);
//   return obj;
// }

}
