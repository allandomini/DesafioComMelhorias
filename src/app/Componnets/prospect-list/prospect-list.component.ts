import { Component, OnInit } from '@angular/core';
import { ProspectService } from '../../service/prospect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ProspectListComponent implements OnInit {
  cidadesOrdenadas: { cidade: string; quantidade: number }[] = [];
  maxValue: number = 0;
  constructor(private prospectService: ProspectService) {}

  ngOnInit(): void {
    this.prospectService.obterCidadesOrdenadasPorNumeroDeProspects().subscribe(
      (cidades) => {
        this.cidadesOrdenadas = cidades;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  getMaxValue(cidades: { cidade: string; quantidade: number }[]): number {
    let max = 0;
    for (let cidade of cidades) {
      if (cidade.quantidade > max) {
        max = cidade.quantidade;
      }
    }
    return max;
  }
}
