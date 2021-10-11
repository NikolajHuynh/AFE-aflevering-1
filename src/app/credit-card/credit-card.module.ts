import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchfilterPipe } from '../searchfilter.pipe';

import { CreditCardRoutingModule } from './credit-card-routing.module';
import { CreditCardOverviewComponent } from './credit-card-overview/credit-card-overview.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { CreditCardAddComponent } from './credit-card-add/credit-card-add.component';
import { CreditCardTransactionsComponent } from './credit-card-transactions/credit-card-transactions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface iCreditCard {
  card_number: number;
  csc_code: number;
  cardholder_name: string;
  expiration_date_month: number;
  expiration_date_year: number;
  issuer: string;
}

export interface iTransaction {
  uid: string
  credit_card: iCreditCard;
  amount: number;
  comment: string;
  date: number;
  currency: string;
}

@NgModule({
  declarations: [CreditCardOverviewComponent, CreditCardDetailsComponent, CreditCardAddComponent, CreditCardTransactionsComponent, SearchfilterPipe],
  imports: [CommonModule, CreditCardRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [CreditCardOverviewComponent, CreditCardDetailsComponent, CreditCardAddComponent, CreditCardTransactionsComponent],
})
export class CreditCardModule {}
