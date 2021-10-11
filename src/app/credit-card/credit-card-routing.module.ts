import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditCardAddComponent } from './credit-card-add/credit-card-add.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';
import { CreditCardOverviewComponent } from './credit-card-overview/credit-card-overview.component';
import { CreditCardTransactionsComponent } from './credit-card-transactions/credit-card-transactions.component';

const routes: Routes = [
  { path: '', component: CreditCardOverviewComponent },
  { path: 'details/:id', component: CreditCardDetailsComponent },
  { path: 'add', component: CreditCardAddComponent },
  { path: 'transactions', component: CreditCardTransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditCardRoutingModule {}
