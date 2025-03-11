import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent {

  private router = inject(Router)
  private toaster = inject(ToastrService)
  model: any = {};
  accountService = inject(AccountsService);

  login()
  {
    this.accountService.login(this.model).subscribe({
      next: () => 
      {
        this.router.navigateByUrl('/members');
      },
      error: error => this.toaster.error(error.error)
    });
    console.log(this.model)
  }

  logout()
  {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }

}
