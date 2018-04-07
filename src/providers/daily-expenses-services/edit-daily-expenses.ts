import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { DueDate } from '../../model/due-date';
import { Income } from '../../model/income';
import { FixedExpenses } from '../../model/fixed-expenses';
import { DailyExpenses } from '../../model/add-daily-expenses';

/*
  Generated class for the DueDateServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EditDailyExpensesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EditDailyExpensesProvider Provider');
  }

  editDailyExpenses(dailyExpenses:DailyExpenses){

    let host = sessionStorage.getItem("host");

    return new Promise<User>(resolve=>{
      this.http.post(host+'/services/dailyExpenses/editDailyExpenses',JSON.stringify({data:dailyExpenses}),
      {headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')}
  )
      .subscribe(dailyExpenses=>{
        
        let data = this.extacObject(dailyExpenses);
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
