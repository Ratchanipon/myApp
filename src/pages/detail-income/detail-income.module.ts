import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailIncomePage } from './detail-income';

@NgModule({
  declarations: [
    DetailIncomePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailIncomePage),
  ],
})
export class DetailIncomePageModule {}
