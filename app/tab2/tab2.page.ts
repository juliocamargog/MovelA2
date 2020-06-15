import { Component } from '@angular/core';
import { CovidService } from '../api/covid.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [CovidService]
})
export class Tab2Page {
  
  constructor(public covidService:CovidService,public loadingController: LoadingController) { }


public lista_estados = new Array<any>();
public status;

ionViewDidEnter()
    {
      this.presentLoading();
      this.carregaPagina();
    }
    carregaPagina()
    {
      this.covidService.todosEstados().subscribe(
        data => {
          const response = (data as any);
          this.lista_estados = this.lista_estados.concat(response.data);
          console.log(this.lista_estados);
        },
        error => {
          console.log(error);
        }
      );
      this.covidService.status().subscribe(
        data => {
          const response = (data as any)
          this.status = response;
          console.log(this.status)
        }
      )
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
        backdropDismiss: true
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed with role:', role);
    }
    
    
}
