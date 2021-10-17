import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private tokenService:TokenService,private router:Router) { }
  getCurrentQueryParameters(delimiter = '#') {
  
    const currentLocation = String(window.location).split(delimiter)[1];
    const params = new URLSearchParams(currentLocation);
    return params;
  }
  ngOnInit(): void {
    const currentQueryParameters = this.getCurrentQueryParameters('#');
    const accessToken = currentQueryParameters.get('access_token');
    localStorage.setItem('access_token', accessToken);
    this.tokenService.getToken().subscribe(res=>this.router.navigate(['/search']));
  }

}
