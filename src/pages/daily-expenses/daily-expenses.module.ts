import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyExpensesPage } from './daily-expenses';

@NgModule({
  declarations: [
    DailyExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyExpensesPage),
  ],
})
export class DailyExpensesPageModule {}
