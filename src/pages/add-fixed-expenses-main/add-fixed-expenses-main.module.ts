import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFixedExpensesMainPage } from './add-fixed-expenses-main';

@NgModule({
  declarations: [
    AddFixedExpensesMainPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFixedExpensesMainPage),
  ],
})
export class AddFixedExpensesMainPageModule {}
