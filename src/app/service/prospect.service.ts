import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prospect } from '../Models/Prospect';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProspectService {
  private url: string = 'http://localhost:8080'; // Corrected URL
  constructor(private http: HttpClient) {}

  // Method to select all Prospects
  selecionar(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(this.url);
  }
  //Method to SingUp Prospects
  cadastrar(obj: Prospect): Observable<Prospect> {
    return this.http.post<Prospect>(this.url, obj);
  }
  //Method to EDIT prospects
  editar(obj: Prospect): Observable<Prospect> {
    return this.http.put<Prospect>(this.url, obj);
  }
  //Method to  REMOVE  prospects
  remover(codigo: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + codigo);
  }
  // Method to get cities ordered by number of prospects
  obterCidadesOrdenadasPorNumeroDeProspects(): Observable<
    { cidade: string; quantidade: number }[]
  > {
    return this.selecionar().pipe(
      map((prospects) => {
        const cidadeMap: { [key: string]: number } = {};
        prospects.forEach((prospect) => {
          if (cidadeMap[prospect.cidadeResidencia]) {
            cidadeMap[prospect.cidadeResidencia]++;
          } else {
            cidadeMap[prospect.cidadeResidencia] = 1;
          }
        });
        const cidades = Object.keys(cidadeMap).map((cidade) => ({
          cidade,
          quantidade: cidadeMap[cidade],
        }));
        return cidades.sort((a, b) => b.quantidade - a.quantidade);
      })
    );
  }
}
