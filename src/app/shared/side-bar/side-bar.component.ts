import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {

  constructor(

    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout = () => {

    this.authService.logout().then( () => {

      this.router.navigateByUrl('/login')
    })

  }

}
