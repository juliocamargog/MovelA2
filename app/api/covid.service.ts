import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private caminhoPadrao = "https://covid19-brazil-api.now.sh/api/report/v1"
  
  constructor(public http:HttpClient) { }

  public todosEstados()
  {
    let estados = "https://covid19-brazil-api.now.sh/api/report/v1";
    console.log(estados)
    return this.http.get(estados);
  }

  public umEstado(est = "rj")
  {
    let estado = `${this.caminhoPadrao}/brazil/uf/${est}`;
    return this.http.get(estado);
  }

  public pais(country = "brazil")
  {
    let pais = `${this.caminhoPadrao}/${country}`;
    return this.http.get(pais);
  }
  public status()
  {
    let status = "https://covid19-brazil-api.now.sh/api/status/v1"
    return this.http.get(status);
  }
}
