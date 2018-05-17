import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { DueDate } from '../../model/due-date';
import { Income } from '../../model/income';

/*
  Generated class for the DueDateServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeleteFixedExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DeleteFixedExpensesProvider Provider');
  }

  DeleteFixedExpenses(fix_expenses_id){
    console.log("DeleteFixedExpenses++");
    console.log(fix_expenses_id);
    let host = sessionStorage.getItem("host");

    return new Promise<User>(resolve=>{
      this.http.get(host+'/services/fixedExpenses/deleteFixedExpenses?fix_expenses_id='+fix_expenses_id)
      .subscribe(fix_expenses=>{
        
        let data = this.extacObject(fix_expenses);
        resolve(data);
      })
    });
    
    
    // return this.http.get('http://localhost/AppManagement/services/users/getUserById?username='+user.username+'&password='+user.password);
}


extacObject(data){
  let json = JSON.stringify(data);
  //console.log(json);
  let obj = JSON.parse(json);
  //console.log(obj);
  return obj;
}

}
