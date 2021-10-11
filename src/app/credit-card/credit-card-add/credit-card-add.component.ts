import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/credit-card.service';
import { iCreditCard } from '../credit-card.module';

@Component({
  selector: 'app-credit-card-add',
  templateUrl: './credit-card-add.component.html',
  styleUrls: ['./credit-card-add.component.scss'],
})
export class CreditCardAddComponent implements OnInit {

  addCreditCardFormGroup: FormGroup;
  creditCardService$: Observable<iCreditCard> | undefined;

  constructor(
    private creditCardService: CreditCardService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {

      this.addCreditCardFormGroup = this.formBuilder.group({
        card_number: ['', [Validators.required, this.cardLengthValidator]],
        cardholder_name: ['', [Validators.required]],
        csc_code: ['', [Validators.required, this.cscLengthValidator]],
        expiration_date_month: [1, [Validators.required, this.monthValidator]],
        expiration_date_year: [1, [Validators.required, this.yearValidator ]],
        issuer: ['']
      });
  } 

  ngOnInit(): void {}

  async onSubmit() {
    let input =  this.addCreditCardFormGroup;

    const creditCard: iCreditCard = {
      
      card_number: input.value.card_number,
      csc_code: input.value.csc_code,
      cardholder_name: input.value.cardholder_name,
      expiration_date_month: input.value.expiration_date_month,
      expiration_date_year: input.value.expiration_date_year,
      issuer: input.value.issuer
    };

    (await this.creditCardService.add(creditCard)).subscribe();

    this.router.navigateByUrl('/');

  }

  showToast() {
    this.toastr.success(`Added card number: ${this.addCreditCardFormGroup.value.card_number} sucessfully!`);
  }

  private cardLengthValidator (control: AbstractControl): ValidationErrors | null {
    let value = String(control.value).length;
    return value < 7 || value > 16  ? {invalid_card_length: true} : null; 
  }

  private cscLengthValidator (control: AbstractControl): ValidationErrors | null {
    let value = String(control.value).length;
    return value < 3 || value > 3  ? {invalid_csc_code_length: true} : null; 
  }
  private monthValidator (control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    return value < 1 || value > 12  ? {invalid_month: true} : null; 
  }

  private yearValidator (control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    return value < 1 || value > 31  ? {invalid_year: true} : null; 
  }
  public control(name: string) {
    return this.addCreditCardFormGroup.get(name);
  }

  get card_number() { return this.addCreditCardFormGroup.get('card_number') as FormControl}
  get csc_code() {return this.addCreditCardFormGroup.get('csc_code') as FormControl}
  get cardholder_name() {return this.addCreditCardFormGroup.get('cardholder_name') as FormControl}
  get expiration_date_month() {return this.addCreditCardFormGroup.get('expiration_date_month') as FormControl}
  get expiration_date_year() {return this.addCreditCardFormGroup.get('expiration_date_year') as FormControl}
  get issuer() {return this.addCreditCardFormGroup.get('issuer') as FormControl}
}

