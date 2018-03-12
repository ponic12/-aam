import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, AlertController, Events } from 'ionic-angular';
import { Platform, NavParams, ViewController } from 'ionic-angular';

import { FirebaseService } from '../../services/firebase.service';
//import { Chart } from 'chart.js';


import * as _ from 'lodash';
import * as moment from 'moment';


@Component({
   selector: 'page-reportes',
   templateUrl: 'reportes.html'
})
export class ReportesPage {
   @ViewChild('barWeekCP') barWeekCP;
   @ViewChild('barWeekTotal') barWeekTotal;
   @ViewChild('doughnutCanvas') doughnutCanvas;
   @ViewChild('lineMonthCP') lineMonthCP;
   @ViewChild('lineMonthTotal') lineMonthTotal;

   chartBarWeekCP: any;
   chartBarWeekTotal: any;
   doughnutChart: any;
   chartLineMonthCP: any;
   chartLineMonthTotal: any;

   salesByMonth: any[] = [];

   private barOptions: any;
   private lineOptions: any;
   private scatterOptions: any;
   private graphData: Array < any > = [];
   private baseSerie: any;


   diet:any = {};

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController,
      public platform: Platform,
      public params: NavParams,
      public events: Events,
      public viewCtrl: ViewController,
      private fs: FirebaseService) {

      let today = new Date();
      this.diet.duration = 10;
      this.diet.startDate = today;
      this.diet.endDate = moment(today).add(15, 'days');;
      this.diet.startWeight = 4000;
      this.diet.endWeight = 10000;
      
      this.salesByMonth = this.fs.getSalesByMonth();

      this.setGraphOptions();
      this.updateGraphData();
      this.getDietData();

      // the way to update the graph from different page 
      // (e.g. diet editor) is to publish the event (graph:update 
      // is just a custom event here). Here we subscribe to the event.
      // events.subscribe('graph:update', () => {
      //     // update graph
      //     this.updateGraphData();

      //     // update summary
      //     this.getDietData();
      // });
   }

   setGraphOptions(): void {
      this.scatterOptions = {
         responsive: true,
         scales: {
            xAxes: [{
               //  type: 'time',
               //     time: {
               //        displayFormats: {
               //             quarter: 'MMM YYYY'
               //        }
               //     }
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return moment(label).format('D/MM');
                  },
                  maxRotation: 0
               }
            }],
            yAxes: [{
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return label; //.toFixed(2);
                  },
                  max: 60000, //Math.round(_.max([parseFloat(startWeight), parseFloat(endWeight)])) + 3,
                  min: 5000 //Math.round(_.min([parseFloat(startWeight), parseFloat(endWeight)])) - 6
               }
            }]
         },
         tooltips: {
            enabled: true,
            callbacks: {
               label: (tooltipItem, data) => {
                  return moment(tooltipItem.xLabel).format('D MM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
               }
            },
            opacity: .8
         },
         pan: {
            enabled: true,
            mode: 'x'
         },
         zoom: {
            enabled: true,
            mode: 'x',
             limits: {
                max: 10,
                min: 0.5
             }
         },
      };
      this.barOptions = {
         responsive: true,
         scales: {
            xAxes: [{
               //  type: 'time',
               //     time: {
               //        displayFormats: {
               //             quarter: 'MMM YYYY'
               //        }
               //     }
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return moment(label).format('D MMM');
                  },
                  maxRotation: 0
               }
            }],
            yAxes: [{
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return label; //.toFixed(2);
                  },
                  max: 60000, //Math.round(_.max([parseFloat(startWeight), parseFloat(endWeight)])) + 3,
                  min: 5000 //Math.round(_.min([parseFloat(startWeight), parseFloat(endWeight)])) - 6
               }
            }]
         },
         tooltips: {
            enabled: true,
            callbacks: {
               label: (tooltipItem, data) => {
                  return moment(tooltipItem.xLabel).format('D MMM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
               }
            },
            opacity: .8
         },
         pan: {
            enabled: true,
            mode: 'x'
         },
         zoom: {
            enabled: true,
            mode: 'x'
            //  limits: {
            //     max: 10,
            //     min: 0.5
            //  }
         },
      };
      this.lineOptions = {
         responsive: true,
         scales: {
            xAxes: [{
               //  type: 'time',
               //     time: {
               //        displayFormats: {
               //             quarter: 'MMM YYYY'
               //        }
               //     }
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return moment(label).format('D');
                  }
               }
            }],
            yAxes: [{
               display: true,
               ticks: {
                  callback: (label: number, index: number, labels: number[]) => {
                     return label; //.toFixed(2);
                  },
                  max: 60000,
                  min: 5000
               }
            }]
         },
         tooltips: {
            enabled: true,
            callbacks: {
               label: (tooltipItem, data) => {
                  return moment(tooltipItem.xLabel).format('D MMM, HH:mm') + ': $' + parseFloat(tooltipItem.yLabel);
               }
            },
            opacity: .8
         },
         pan: {
            enabled: true,
            mode: 'x'
         },
         zoom: {
            enabled: true,
            mode: 'x',
            limits: {
               max: 10,
               min: 0.5
            }
         },
      };
   }
   updateGraphData(): void {
      this.baseSerie = this.prepareBaseSerie();

      let dataSerie: any = {
         label: "Venta",
         data: this.salesByMonth.map(sale => {
            var dt = new Date(sale.datetime);
            return {
               x: dt,
               y: sale.total
            };
         }),
         fill: false,
         pointRadius: 2,
         borderColor: '#ff0000',
         pointBorderColor: '#6d6d6d',
         backgroundColor: '#67a3ed'
      };

      this.graphData = [this.baseSerie, dataSerie];
   }
   getDietData(): void {
      // let currentDay, progress, now = new Date();

      // if (now >= moment(this.diet.endDate).toDate()) {
      //     currentDay = this.diet.duration;
      //     progress = 100;
      // } else if (now < moment(this.diet.startDate).toDate()) {
      //     currentDay = 0;
      //     progress = 0;
      // } else {
      //     currentDay = moment(now).diff(moment(this.diet.startDate), 'days');
      //     progress = ((currentDay / this.diet.duration) * 100.0).toFixed(2);
      // }

      // // let's find the latest measurement today
      // // measurements are ordered descending so first one from 
      // // today will be the latest today
      // let allowedToEat = null;
      // let latestWeight = null;
      // let allowedWeight = null;
      // let dietActive: boolean = false;

      // if (moment(this.diet.startDate).toDate() <= now && moment(this.diet.endDate).toDate() >= now) {
      //     dietActive = true;
      // }

      // if (dietActive) {
      //     let today: string = moment(new Date()).format('l');   // 6/9/2017
      //     this.diet.measurements.forEach(measurement => {
      //         if (latestWeight === null && moment(measurement.date).format('l') == today) {
      //             latestWeight = measurement.weight;
      //         }
      //     });

      //     this.graphData[0].data.forEach(data => {
      //         if (moment(data.x).format('l') == today) {
      //             allowedWeight = data.y;
      //         }
      //     });
      //     if (latestWeight && allowedWeight)
      //         allowedToEat = Math.round((allowedWeight - latestWeight) * 1000);

      // }

      // this.dietSummary = {
      //     currentDay,
      //     progress,
      //     allowedToEat,
      //     dietActive,
      //     allowedWeight
      // };
   }

   ionViewDidLoad() {
      const col = {
         blueFill: 'rgba(54, 162, 235, 0.2)',
         blueBorder: 'rgba(54, 162, 235, 1)',
         yellowFill: 'rgba(255, 206, 86, 0.2)',
         yellowBorder: 'rgba(255, 206, 86, 0.2)',
         redFill: 'rgba(255, 99, 132, 0.2)',
         redBorder: 'rgba(255,99,132,1)',
         greenFill: 'rgba(75, 192, 192, 0.2)',
         greenBorder: 'rgba(75, 192, 192, 1)',
         purpleFill: 'rgba(153, 102, 255, 0.2)',
         purpleBorder: 'rgba(153, 102, 255, 1)',
         orangeFill: 'rgba(255, 159, 64, 0.2)',
         orangeBorder: 'rgba(255, 159, 64, 1)'
      };

      console.log(col.blueBorder);

      //     this.chartBarWeekCP = new Chart(this.barWeekCP.nativeElement, {
      //         type: 'bar',
      //         data: {
      //             labels: ["lun", "mar", "mie", "jue", "vie", "sab"],
      //             datasets: [{
      //                     label: 'Efectivo',
      //                     data: [7000, 5000, 3400, 5500, 6600, 9000],
      //                     backgroundColor: [
      //                         col.blueFill,
      //                         col.blueFill,
      //                         col.blueFill,
      //                         col.blueFill,
      //                         col.blueFill,
      //                         col.blueFill],
      //                     borderColor: [ 
      //                         col.blueBorder,
      //                         col.blueBorder,
      //                         col.blueBorder,
      //                         col.blueBorder,
      //                         col.blueBorder,
      //                         col.blueBorder],
      //                     borderWidth: 1
      //                 },
      //                 {
      //                     label: 'Tarjeta',
      //                     data: [4000, 4000, 3000, 5400, 5200, 6000],
      //                     backgroundColor: [
      //                         col.yellowFill,
      //                         col.yellowFill,
      //                         col.yellowFill,
      //                         col.yellowFill,
      //                         col.yellowFill,
      //                         col.yellowFill],
      //                     borderColor: [
      //                         col.yellowBorder,
      //                         col.yellowBorder,
      //                         col.yellowBorder,
      //                         col.yellowBorder,
      //                         col.yellowBorder,
      //                         col.yellowBorder],
      //                     borderWidth: 1
      //                 },
      //                 {
      //                     label: 'Cuenta',
      //                     data: [6000, 6000, 3000, 1500, 5600, 5000],
      //                     backgroundColor: [
      //                         col.redFill,
      //                         col.redFill,
      //                         col.redFill,
      //                         col.redFill,
      //                         col.redFill,
      //                         col.redFill],
      //                     borderColor: [
      //                         col.redBorder,
      //                         col.redBorder,
      //                         col.redBorder,
      //                         col.redBorder,
      //                         col.redBorder,
      //                         col.redBorder],
      //                     borderWidth: 1
      //                 },
      //                 {
      //                     label: 'Pago',
      //                     data: [2000, 1100, 1400, 1400, 1200, 700],
      //                     backgroundColor: [
      //                         col.greenFill,
      //                         col.greenFill,
      //                         col.greenFill,
      //                         col.greenFill,
      //                         col.greenFill,
      //                         col.greenFill],
      //                     borderColor: [
      //                         col.greenBorder,
      //                         col.greenBorder,
      //                         col.greenBorder,
      //                         col.greenBorder,
      //                         col.greenBorder,
      //                         col.greenBorder],
      //                     borderWidth: 1
      //                 },]
      //         },
      //         options: {
      //             scales: {
      //                 yAxes: [{
      //                     ticks: {
      //                         beginAtZero:true
      //                     }
      //                 }]
      //             }
      //         }
      //     });
      //     this.chartBarWeekTotal = new Chart(this.barWeekTotal.nativeElement, {
      //         type: 'bar',
      //         data: {
      //             labels: ["lun", "mar", "mie", "jue", "vie", "sab"],
      //             datasets: [{
      //                     label: 'Total diario',
      //                     data: [7000, 5000, 3400, 5500, 6600, 9000],
      //                     backgroundColor: [ 
      //                         col.purpleFill, 
      //                         col.purpleFill,
      //                         col.purpleFill,
      //                         col.purpleFill,
      //                         col.purpleFill,
      //                         col.purpleFill],
      //                     borderColor: [ 
      //                         col.purpleBorder,
      //                         col.purpleBorder,
      //                         col.purpleBorder,
      //                         col.purpleBorder,
      //                         col.purpleBorder,
      //                         col.purpleBorder],
      //                     borderWidth: 1
      //                 }]
      //         },
      //         options: {
      //             scales: {
      //                 yAxes: [{
      //                     ticks: {
      //                         beginAtZero:true
      //                     }
      //                 }]
      //             }
      //         }
      // });
      //     this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      //     type: 'doughnut',
      //     data: {
      //         labels: ["Efvo", "Tarjeta", "Cta.Cte.", "Pago a cta."],
      //         // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //         datasets: [{
      //             label: 'Tipo Pago',
      //             data: [30, 40, 20, 10],
      //             backgroundColor: [
      //                 'rgba(54, 162, 235, 0.2)',
      //                 'rgba(255, 206, 86, 0.2)',
      //                 'rgba(255, 99, 132, 0.2)',
      //                 'rgba(75, 192, 192, 0.2)'
      //             ],
      //             hoverBackgroundColor: [
      //                 "#36A2EB",
      //                 "#FFCE56",
      //                 "#FF6384",
      //                 "#80CECE"
      //             ]
      //         }]
      //     }
      // });    
      //     this.chartLineMonthCP = new Chart(this.lineMonthCP.nativeElement, {
      //     type: 'line',
      //     data: {
      //         labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      //         datasets: [
      //             {
      //                 label: "Efectivo",
      //                 fill: false,
      //                 lineTension: 0.1,
      //                 backgroundColor: col.blueFill,
      //                 borderColor: col.blueBorder,
      //                 borderCapStyle: 'butt',
      //                 borderDash: [],
      //                 borderDashOffset: 0.0,
      //                 borderJoinStyle: 'miter',
      //                 pointBorderColor: col.blueBorder,
      //                 pointBackgroundColor: "#fff",
      //                 pointBorderWidth: 1,
      //                 pointHoverRadius: 5,
      //                 pointHoverBackgroundColor: col.blueFill,
      //                 pointHoverBorderColor: "rgba(220,220,220,1)",
      //                 pointHoverBorderWidth: 2,
      //                 pointRadius: 1,
      //                 pointHitRadius: 10,
      //                 data: [2000, 2100, 1600, 4000, 1000, 3000, 1500],
      //                 spanGaps: false,
      //             },
      //             {
      //                 label: "Tarjeta",
      //                 fill: false,
      //                 lineTension: 0.1,
      //                 backgroundColor: col.orangeFill,
      //                 borderColor: col.orangeBorder,
      //                 borderCapStyle: 'butt',
      //                 borderDash: [],
      //                 borderDashOffset: 0.0,
      //                 borderJoinStyle: 'miter',
      //                 pointBorderColor: col.orangeBorder,
      //                 pointBackgroundColor: "#fff",
      //                 pointBorderWidth: 1,
      //                 pointHoverRadius: 5,
      //                 pointHoverBackgroundColor: col.orangeFill,
      //                 pointHoverBorderColor: "rgba(220,220,220,1)",
      //                 pointHoverBorderWidth: 2,
      //                 pointRadius: 1,
      //                 pointHitRadius: 10,
      //                 data: [3000, 5100, 3600, 4000, 1000, 3000, 2500],
      //                 spanGaps: false,
      //             },
      //             {
      //                 label: "Cta.Cte.",
      //                 fill: false,
      //                 lineTension: 0.1,
      //                 backgroundColor: col.redFill,
      //                 borderColor: col.redBorder,
      //                 borderCapStyle: 'butt',
      //                 borderDash: [],
      //                 borderDashOffset: 0.0,
      //                 borderJoinStyle: 'miter',
      //                 pointBorderColor: col.redBorder,
      //                 pointBackgroundColor: "#fff",
      //                 pointBorderWidth: 1,
      //                 pointHoverRadius: 5,
      //                 pointHoverBackgroundColor: col.redFill,
      //                 pointHoverBorderColor: "rgba(220,220,220,1)",
      //                 pointHoverBorderWidth: 2,
      //                 pointRadius: 1,
      //                 pointHitRadius: 10,
      //                 data: [1000, 1100, 600, 400, 9000, 700, 500],
      //                 spanGaps: false,
      //             },
      //             {
      //                 label: "Pago Cta.",
      //                 fill: false,
      //                 lineTension: 0.1,
      //                 backgroundColor: col.greenFill,
      //                 borderColor: col.greenBorder,
      //                 borderCapStyle: 'butt',
      //                 borderDash: [],
      //                 borderDashOffset: 0.0,
      //                 borderJoinStyle: 'miter',
      //                 pointBorderColor: col.greenBorder,
      //                 pointBackgroundColor: "#fff",
      //                 pointBorderWidth: 1,
      //                 pointHoverRadius: 5,
      //                 pointHoverBackgroundColor: col.greenFill,
      //                 pointHoverBorderColor: "rgba(220,220,220,1)",
      //                 pointHoverBorderWidth: 2,
      //                 pointRadius: 1,
      //                 pointHitRadius: 10,
      //                 data: [200, 200, 100, 400, 1000, 600, 500],
      //                 spanGaps: false,
      //             }
      //         ]
      //     }
      // });
      //     this.chartLineMonthTotal = new Chart(this.lineMonthTotal.nativeElement, {
      //     type: 'line',
      //     data: {
      //         labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      //         datasets: [
      //             {
      //                 label: "Total mensual",
      //                 fill: false,
      //                 lineTension: 0.1,
      //                 backgroundColor: col.purpleFill,
      //                 borderColor: col.purpleBorder,
      //                 borderCapStyle: 'butt',
      //                 borderDash: [],
      //                 borderDashOffset: 0.0,
      //                 borderJoinStyle: 'miter',
      //                 pointBorderColor: col.purpleBorder,
      //                 pointBackgroundColor: "#fff",
      //                 pointBorderWidth: 1,
      //                 pointHoverRadius: 5,
      //                 pointHoverBackgroundColor: col.purpleFill,
      //                 pointHoverBorderColor: "rgba(220,220,220,1)",
      //                 pointHoverBorderWidth: 2,
      //                 pointRadius: 1,
      //                 pointHitRadius: 10,
      //                 data: [20000, 25000, 26000, 24000, 22000, 30000, 35000],
      //                 spanGaps: false,
      //             }
      //         ]
      //     }
      // });
   }

   private prepareBaseSerie(): any {
      let baseSerie: any = {
         label: "Base",
         data: [],
         fill: false,
         pointRadius: 0,
         borderColor: '#ff0000'
      };

       let currDate = moment(this.diet.startDate).clone().startOf('day');
       let lastDate = moment(this.diet.endDate).clone().startOf('day');
       let startWeight = this.diet.startWeight;
       let weightPerDay = (this.diet.endWeight - this.diet.startWeight) / this.diet.duration;

       do {
            baseSerie.data.push({
                x: currDate.clone().toDate(),
                y: startWeight
            });

            // startWeight += weightPerDay was treated as string
            startWeight -= (weightPerDay * (-1));
       } while (currDate.add(1, 'days').diff(lastDate) <= 0);

      return baseSerie;
   }

}
