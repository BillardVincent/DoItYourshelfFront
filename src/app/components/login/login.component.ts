import { Component, OnInit } from '@angular/core';
import { TokenStorageServiceService } from 'src/app/services/token-storage-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(private authService: AuthService, private tokenStorage: TokenStorageServiceService, private toolsService: ToolsService) { }

    ngOnInit() {
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      }
    }

    onSubmit() {
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.toolsService.loadLocalStorage();
          this.reloadPage();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }

    reloadPage() {
      window.location.reload();
    }
  }
