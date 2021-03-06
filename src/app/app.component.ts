import { Component } from '@angular/core';
import { TokenStorageServiceService } from './services/token-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoItYourShelfFront';


private roles: string[];
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username: string;

constructor(private tokenStorageService: TokenStorageServiceService) { }

ngOnInit() {
  this.isLoggedIn = !!this.tokenStorageService.getToken();

  if (this.isLoggedIn) {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    this.username = user.username;
  }
}

logout() {
  this.tokenStorageService.signOut();
  window.location.reload();
}

}
