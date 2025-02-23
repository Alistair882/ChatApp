import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_service/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private toaster = inject(ToastrService)
  model: any = {};
  usersFromHome = input<any>();
  cancelRegister = output<boolean>();
  private accountService = inject(AccountsService);

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response)
        this.cancelRegistration();
      },
      error: error => this.toaster.error(error.error)
    })
  }

  cancelRegistration()
  {
    this.cancelRegister.emit(false)
  }
}
