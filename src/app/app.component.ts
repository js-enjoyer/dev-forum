import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AsideComponent } from './main/aside/aside.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HeaderComponent, 
    AsideComponent, 
    FooterComponent, 
    AuthenticateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dev-forum';
}
