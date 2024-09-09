import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './../../service/login-service.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'], // corrigido para styleUrls
})
export class LoginPageComponent {
  usuario = '';
  senha = '';
  resultado = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.usuario, this.senha).subscribe(
      (response: any) => {
        this.resultado = 'Sucesso: ' + response.name;
        this.router.navigate(['/DashBoard']);
      },
      (error: any) => {
        this.resultado =
          'Fracasso: ' + (error.error ? error.error : 'Erro desconhecido');
      }
    );
  }
}
