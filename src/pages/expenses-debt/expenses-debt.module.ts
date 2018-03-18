import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesDebtPage } from './expenses-debt';

@NgModule({
  declarations: [
    ExpensesDebtPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesDebtPage),
  ],
})
export class ExpensesDebtPageModule {}
