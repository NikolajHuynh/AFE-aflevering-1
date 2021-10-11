import { Pipe, PipeTransform } from '@angular/core';
import { iTransaction } from './credit-card/credit-card.module';

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(transactions: iTransaction[] | null, searchValue: string): iTransaction[]  | null{
    if (!transactions || !searchValue) {
      return transactions;
    }

    let t: iTransaction[] = transactions.filter((transaction) => {
      return transaction.credit_card.card_number.toString().substring(0, searchValue.length) === searchValue
    })

    return t
  }
}