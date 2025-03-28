import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountsService);
  const toaster = inject(ToastrService);

  if(accountService.currentUser())
  {
    return true;
  }
  else
  {
    toaster.error('You are not authorized to access this link!');
    return false
  }
};
