import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDailyExpensesPage } from './add-daily-expenses';

@NgModule({
  declarations: [
    AddDailyExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDailyExpensesPage),
  ],
})
export class AddDailyExpensesPageModule {}
