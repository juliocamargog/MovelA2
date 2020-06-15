import { Component } from '@angular/core';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public autenticacaoService:AutenticacaoService,public router:Router,public navCtrl: NavController) {}

  
  desconectarUsuario()
  {
    localStorage.setItem("login","");
    console.log(localStorage.getItem("login"));
    this.router.navigate(['login']);
  }
  
}
