import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountsService } from '../_service/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {

  model: any = {};
  private accountService = inject(AccountsService);
  loggedin = false;

  login()
  {
    this.accountService.login(this.model).subscribe({
      next: response => 
      {
        console.log(response);
        this.loggedin = true;
      },
      error: error => console.log(error)
    });
    console.log(this.model)
  }

  logout()
  {
    this.loggedin = false;
  }

}
