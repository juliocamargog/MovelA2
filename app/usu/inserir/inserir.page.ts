import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.page.html',
  styleUrls: ['./inserir.page.scss'],
})
export class InserirPage implements OnInit {

  public email:string="";
  public senha:string="";
  public mensagem:string="";
 
  constructor(public autenticacaoService:AutenticacaoService,public router:Router,public toastController:ToastController) { }

  ngOnInit() {
  }

  insereUsuario(){
    this.autenticacaoService.insereNoFirebase(this.email,this.senha)
    .then((res) => {
      this.router.navigate(['app/usu/login']);
    }).catch((error) => {
      this.mensagem = "Erro ao incluir usuário";
      this.exibeMensagem();
    })
  }

  async exibeMensagem() {
    const toast = await this.toastController.create({
      message: this.mensagem,
      duration: 2000
    });
    toast.present();
  }

  irLogin()
  {
    this.router.navigate(['login']);
  }
}
