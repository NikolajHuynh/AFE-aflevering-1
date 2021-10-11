import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreditCardService } from 'src/app/credit-card.service';
import { iCreditCard } from '../credit-card.module';

@Component({
  selector: 'app-credit-card-overview',
  templateUrl: './credit-card-overview.component.html',
  styleUrls: ['./credit-card-overview.component.scss'],
})
export class CreditCardOverviewComponent implements OnInit {
  creditCardService$: Observable<iCreditCard[]>;

  constructor(
    private creditCardService: CreditCardService,
    private router: Router
  ) {
    this.creditCardService$ = creditCardService.getCreditCards();
  }

  navigateToCardDetails(index: number, card: iCreditCard) {
    this.router.navigate(['/details/' + index, card]);
  }

  ngOnInit(): void {}
}
