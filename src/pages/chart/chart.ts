import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');

    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['รายรับ',     11],
      ['รายจ่ายคงที่',      2],
      ['รายจ่ายรายวัน',  2]
    ]);

    var options = {
      title: 'งบการเงินส่วนบุคคล',
      pieHole: 1.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
  }

  showChart(){
    
  }

}
