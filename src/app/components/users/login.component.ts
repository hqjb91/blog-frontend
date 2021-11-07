import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.username, this.form.value.password)
              .subscribe( response => {
                this.authService.setLocalStorage(response); 
                this.router.navigate(['create']);
              });
    }
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

}
