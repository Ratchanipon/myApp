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
export class DeleteDailyExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DeleteDailyExpensesProvider Provider');
  }

  DeleteDailyExpenses(daily_expenses_id){
    console.log("DeleteDailyExpenses++");
    console.log(daily_expenses_id);
    let host = sessionStorage.getItem("host");

    return new Promise<User>(resolve=>{
      this.http.get(host+'/services/dailyExpenses/deleteDailyExpenses?daily_expenses_id='+daily_expenses_id)
      .subscribe(daily_expenses=>{
        
        let data = this.extacObject(daily_expenses);
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
