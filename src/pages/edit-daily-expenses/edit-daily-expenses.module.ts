import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDailyExpensesPage } from './edit-daily-expenses';

@NgModule({
  declarations: [
    EditDailyExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDailyExpensesPage),
  ],
})
export class EditDailyExpensesPageModule {}
