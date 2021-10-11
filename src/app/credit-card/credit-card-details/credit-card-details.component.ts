import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/credit-card.service';
import { iCreditCard, iTransaction } from '../credit-card.module';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html',
  styleUrls: ['./credit-card-details.component.scss'],
})
export class CreditCardDetailsComponent implements OnInit {
  cardData$: any;
  transactions$: Observable<iTransaction[]> | null;
  creditCardService$: Observable<iCreditCard[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private transactions: CreditCardService,
    private creditCardService: CreditCardService,
    private router: Router) 
    {
    this.cardData$ = this.activatedRoute.snapshot.params;
    this.transactions$ = transactions.getTransactions();
    this.creditCardService$ = creditCardService.getCreditCards();    
  }

  ngOnInit(): void {}

  async deleteCard(card:iCreditCard){
    (await this.creditCardService.deleteCard(card)).subscribe();
    console.log("deleting: " + card.card_number)

    this.router.navigate(['']);
  }
}
