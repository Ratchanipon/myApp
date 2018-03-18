import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomeDebtPage } from './income-debt';

@NgModule({
  declarations: [
    IncomeDebtPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomeDebtPage),
  ],
})
export class IncomeDebtPageModule {}
