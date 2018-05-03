import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailDailyExpensesPage } from './detail-daily-expenses';

@NgModule({
  declarations: [
    DetailDailyExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailDailyExpensesPage),
  ],
})
export class DetailDailyExpensesPageModule {}
