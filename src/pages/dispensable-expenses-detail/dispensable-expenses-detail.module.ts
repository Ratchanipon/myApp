import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispensableExpensesDetailPage } from './dispensable-expenses-detail';

@NgModule({
  declarations: [
    DispensableExpensesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DispensableExpensesDetailPage),
  ],
})
export class DispensableExpensesDetailPageModule {}
