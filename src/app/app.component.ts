import { Component } from '@angular/core';
import { TokenStorageServiceService } from './services/token-storage-service.service';
import { ToolsService } from './services/tools.service';
import { faHome, faUser, faWarehouse, faClipboardList, faSignInAlt, faSignOutAlt, faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DoItYourShelfFront';
  faHome = faHome;
  faUser = faUser;
  faWarehouse = faWarehouse;
  faClipboard = faClipboardList;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUserEdit = faUserEdit;


private roles: string[];
isLoggedIn = false;
showAdminBoard = false;
showModeratorBoard = false;
username: string;

constructor(private tokenStorageService: TokenStorageServiceService, private toolsService: ToolsService) { }

ngOnInit() {
  this.isLoggedIn = !!this.tokenStorageService.getToken();

  if (this.isLoggedIn) {
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    this.username = user.username;
    this.toolsService.loadLocalStorage();

  }
}

logout() {
  this.tokenStorageService.signOut();
  window.location.reload();
}

}
