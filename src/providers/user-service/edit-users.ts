
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EditUserProvider {

  // user:User;

  constructor(public http: HttpClient) {
    console.log('Hello EditUserProvider Provider');
  }

  EditUserProvider(user:User){

      let host = sessionStorage.getItem("host");

      return new Promise<User>(resolve=>{
        this.http.post(host+'/services/users/editUser',JSON.stringify({data:user}),
        {headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')}
    )
        .subscribe(user=>{
          console.log("user====",user);
          
          let data = this.extacObject(user);
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
