import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DispensableExpensesPage } from './dispensable-expenses';

@NgModule({
  declarations: [
    DispensableExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(DispensableExpensesPage),
  ],
})
export class DispensableExpensesPageModule {}
