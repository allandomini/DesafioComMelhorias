import { FilterPipe } from './filter.pipe';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrincipalComponent } from './Componnets/principal/principal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, PrincipalComponent],
})
export class AppComponent {
  title = 'Desafio-Front';
}
