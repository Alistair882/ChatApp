import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private toaster = inject(ToastrService)
  cancelRegister = output<boolean>();
  private accountService = inject(AccountsService);
  private router = inject(Router);
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl<Date | null>(null, Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true };
    }

  }

  register()
  {
    const dob = this.getDateOnly(this.registerForm.value.dateOfBirth);
    this.registerForm.patchValue({ dateOfBirth: dob });
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.toaster.success('Registration successful');
        error: (error: string[]) => this.validationErrors = error;

      },
      error: error => this.toaster.error(error.error)
    })
  }

  private getDateOnly(date: Date | null) {
    if (date === null) return null;
    const dateString = date.toISOString().slice(0, 10);
    return new Date(dateString);
  }

  cancelRegistration()
  {
    this.cancelRegister.emit(false)
  }
}
