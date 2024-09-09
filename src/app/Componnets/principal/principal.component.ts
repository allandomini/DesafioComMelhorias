import { Prospect } from '../../Models/Prospect';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProspectService } from '../../service/prospect.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProspectListComponent } from '../prospect-list/prospect-list.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    ProspectListComponent,
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [DatePipe],
})
export class PrincipalComponent implements OnInit {
  //TITULO DA PAGINA
  title = 'Dashboard';
  //Objeto do tipo Prospect
  prospect = new Prospect();
  //visibilidade CadastroProspect
  CadastroProspect: boolean = false;
  // Visibilidade dos Botoes no HTML
  btnCadastro: boolean = true;
  //visibilidad tabela
  tabela: boolean = true;
  ClientView: boolean = false;
  prospectView: boolean = true;
  searchView: boolean = false;
  DiagnosticTable: boolean = false;
  // JSON de Prospects
  prospects: Prospect[] = [];
  filteredProspects: Prospect[] = [];
  // Campo de busca
  searchTerm: string = '';

  //Metodos de
  AbrirModal(): void {
    this.CadastroProspect = true;
  }
  mostrarClientes(): void {
    console.log(this.tabela);

    this.ClientView = true;
    this.prospectView = false;
    this.searchView = false;
    this.DiagnosticTable = false;
  }
  mostrarProspects(): void {
    this.ClientView = false;
    this.prospectView = true;
    this.searchView = false;
    this.DiagnosticTable = false;
  }
  mostrarDiagnostico() {
    this.ClientView = false;
    this.prospectView = false;
    this.searchView = false;
    this.DiagnosticTable = true;
  }

  //construtor
  constructor(private service: ProspectService, private datePipe: DatePipe) {}

  //Metodo de selecao
  selecionar(): void {
    this.service.selecionar().subscribe((retorno) => {
      console.log(retorno);
      this.prospects = retorno;
    });
  }
  //metodo de cadastro
  cadastrar(): void {
    this.service.cadastrar(this.prospect).subscribe((retorno) => {
      this.prospects.push(retorno);
      this.prospect = new Prospect();
      alert('Prospect Registrado com sucesso!');
      this.CadastroProspect = false;
    });
  }
  //metodo select especific Prospect
  selecionarClient(posicao: number): void {
    this.CadastroProspect = true;
    this.prospect = this.prospects[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }
  // Método mudar prospect para cliente ou cliente para prospect
  mudar(posicao: number): void {
    const prospectAtual = this.prospects[posicao];
    const novoTipo = prospectAtual.tipo === 'Cliente' ? 'Prospect' : 'Cliente';
    let dataConversao = '';
    if (novoTipo === 'Cliente') {
      dataConversao =
        this.datePipe.transform(new Date(), ' dd-MM-yyyy || HH:mm:ss') || '';
    }
    const prospectAtualizado: Prospect = {
      ...prospectAtual,
      tipo: novoTipo,
      dataHoraConversao: dataConversao,
    };
    this.service.editar(prospectAtualizado).subscribe(
      (retorno) => {
        this.prospects[posicao] = retorno;
        this.btnCadastro = true;
        this.tabela = true;
        alert(`Tipo alterado para ${novoTipo} com sucesso!`);
      },
      (erro) => {
        console.error('Erro ao atualizar o tipo:', erro);
        alert(
          'Houve um problema ao tentar atualizar o tipo. Por favor, tente novamente.'
        );
      }
    );
  }
  // Método editar clientes
  editar(): void {
    this.service.editar(this.prospect).subscribe(
      (retorno) => {
        const posicao = this.prospects.findIndex(
          (obj) => obj.id === retorno.id
        );
        if (posicao !== -1) {
          this.prospects[posicao] = retorno;
        }
        this.prospect = new Prospect();
        this.btnCadastro = true;
        this.tabela = true;
        alert('Cliente alterado com sucesso!');
        this.CadastroProspect = false;
      },
      (erro) => {
        console.error('Erro ao atualizar cliente:', erro);
        alert(
          'Houve um problema ao tentar atualizar o cliente. Por favor, tente novamente.'
        );
      }
    );
  }
  //metodo remover
  remover(): void {
    this.service.remover(this.prospect.id).subscribe((retorno) => {
      let posicao = this.prospects.findIndex((obj) => {
        return obj.id == this.prospect.id;
      });

      this.prospects.splice(posicao, 1);
      this.prospect = new Prospect();
      this.btnCadastro = true;
      this.tabela = true;
      alert('Cliente removido com sucesso!');
      this.filtrarProspects();
    });
    this.CadastroProspect = false;
  }
  //metodo de Busca
  filtrarProspects(): void {
    this.prospectView = false;
    this.ClientView = false;
    this.searchView = true;
    const term = this.searchTerm.toLowerCase();
    this.filteredProspects = this.prospects.filter(
      (prospect) =>
        prospect.nome.toLowerCase().includes(term) ||
        prospect.numeroDocumento.toLowerCase().includes(term)
    );
  }
  //metodo Cancelar
  cancelar(): void {
    this.prospect = new Prospect();
    this.btnCadastro = true;
    this.tabela = true;
    this.CadastroProspect = false;
  }
  //metodo inicializacao
  ngOnInit() {
    this.selecionar();
  }
}
