import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/credit-card.service';
import { iCreditCard, iTransaction } from '../credit-card.module';

@Component({
  selector: 'app-credit-card-transactions',
  templateUrl: './credit-card-transactions.component.html',
  styleUrls: ['./credit-card-transactions.component.scss'],
})
export class CreditCardTransactionsComponent implements OnInit {
  transactions$: Observable<iTransaction[]>;
  @Input()searchValue: string;

  addTransactionFormGroup: FormGroup;


  constructor(
    private transactions: CreditCardService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.transactions$ = transactions.getTransactions();
    this.searchValue ="";

    console.log(this.transactions$);

    this.addTransactionFormGroup = this.formBuilder.group({
      credit_card: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      comment: [1, [Validators.required]],
      date: [1, [Validators.required]],
    });

    }

  ngOnInit(): void {

    this.transactions.getTransactions().subscribe((allTransactions:iTransaction[])=> {
    });
  }

  async deleteTransaction(transaction: iTransaction){
    await (await this.transactions.deleteTransaction(transaction)).subscribe((result) => {
      //this.ngOnInit();
      this.transactions$ =  this.transactions.getTransactions();
    });
  }

  async onSubmit() {
    this.transactions$ = this.transactions.getNewTransactions();
  }

  async onSubmitTransaction() {

    let input = this.addTransactionFormGroup;

    const credit_card: iCreditCard = {
      card_number: input.value.credit_card,
      csc_code: 0,
      cardholder_name: '',
      expiration_date_month: 0,
      expiration_date_year: 0,
      issuer: ''
    }
    
    const trans: iTransaction  = {
      uid: '',
      credit_card: credit_card,
      amount: input.value.amount,
      comment: input.value.comment,
      date: input.value.date,
      currency: input.value.currency
    }

    await (await this.transactions.addTransaction(trans)).subscribe();

    this.transactions$ =  await this.transactions.getTransactions();   

    this.showToast();
  }

  showToast() {
    this.toastr.success(`Added transaction sucesfully`)
  }
}
