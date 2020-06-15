import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { CovidService } from '../api/covid.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [CovidService]
})

export class Tab3Page {

  constructor(public covidService:CovidService,public loadingController: LoadingController,public navCtrl: NavController) {}

  public escolha;
  public lista_estados;public estado;public cases;public deaths;public state;
  public lista_estados2;public estado2;public cases2;public deaths2;public state2;
  public comparacao = "";

  ionViewDidEnter()
    {
      this.presentLoading();
      this.carregaPagina();
    }
   
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      cssClass: ['my-custom-class','custom-class custom-loading'],
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      //cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  carregaPagina()
    {
      this.covidService.umEstado(this.escolha).subscribe(
        data => {
          const response = (data as any);
          this.lista_estados = response;
          console.log(this.lista_estados);
          this.estado = this.lista_estados.uf;
          this.state = this.lista_estados.state;
          this.cases = this.lista_estados.cases;
          this.deaths = this.lista_estados.deaths;
        },
        error => {
          console.log(error);
        }
      );
      this.covidService.umEstado(this.comparacao).subscribe(
        data => {
          const response = (data as any);
          this.lista_estados2 = response;
          console.log(this.lista_estados2);
          this.estado2 = this.lista_estados2.uf;
          this.state2 = this.lista_estados2.state;
          this.cases2 = this.lista_estados2.cases;
          this.deaths2 = this.lista_estados2.deaths;
        },
        error => {
          console.log(error);
        }
      );
    }


  barChartOptions: any = [{
    scales: {
       yAxes: [
        {
            display: true,
            ticks: {
              fontSize: 10,
              colors: '#fff'
            }
        }
      ]
    }
  }];
  barChartLabels = [];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;
  barChartData:any;
  barChartColors:Array<any> = [
    {
      backgroundColor: '#3F51B5',
      borderColor: '#3F51B5',
      pointBackgroundColor: '#3F51B5',
      pointBorderColor: '#3F51B5',
      pointHoverBackgroundColor: '#3F51B5',
      pointHoverBorderColor: '#3F51B5',
      labels: '#3F51B5'
    }]
 
  doughnutChartLabels:string[];
  doughnutChartData:number[];
  doughnutChartType:string = 'doughnut';

 
  calc(tipo){
    if (tipo === 'bar') {
        this.calcBar();
    } else {
        this.calcDoughnut();
    }
  }
  
  calcBar(){
    this.barChartLabels = [this.estado,this.comparacao];      
    this.barChartData = [
  	  {data: [this.cases,this.cases2], label: 'Contaminados'},
    	  {data: [this.deaths,this.deaths2], label: 'Mortes'}
    ];
  }
  
  calcDoughnut(){
    this.doughnutChartLabels = ['Contaminados', 'Mortes'];
    this.doughnutChartData = [this.cases, this.deaths];
  };
  
}
