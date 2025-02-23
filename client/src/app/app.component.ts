import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { AccountsService } from './_service/accounts.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private accountService = inject(AccountsService);

  ngOnInit(): void
  {
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user');
    
    if(!userString)
    {
      return;
    }

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }


}
