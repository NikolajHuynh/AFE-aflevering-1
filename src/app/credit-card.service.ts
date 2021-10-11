import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iCreditCard, iTransaction } from './credit-card/credit-card.module';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor(private http: HttpClient) {}

  rootURL = `http://localhost:3000`;

  getCreditCards(): Observable<iCreditCard[]> {
    return this.http.get<iCreditCard[]>(`${this.rootURL}/credit_cards`).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    );
  }

  getTransactions(): Observable<iTransaction[]> {
    return this.http.get<iTransaction[]>(`${this.rootURL}/transactions`).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    );
  }

  async deleteCard(card:iCreditCard){
    return await this.http.delete<iCreditCard>(`${this.rootURL}/credit_cards/${card.card_number}`).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    )
  }

  async add(creditCard : iCreditCard) {
    return await this.http.post<iCreditCard>(`${this.rootURL}/credit_cards`, creditCard).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    );
  }

  async addTransaction(transaction : iTransaction) {
    return await this.http.post<iTransaction>(`${this.rootURL}/transactions`, transaction).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    );
  }

  getNewTransactions(): Observable<iTransaction[]> {
    return this.http.get<iTransaction[]>(`${this.rootURL}/transactions/generate`).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    );
  }

  async deleteTransaction(transaction: iTransaction){
    return await this.http.delete<iCreditCard>(`${this.rootURL}/transactions/${transaction.uid}`).pipe(
      catchError((err) => {
        throw 'something went wrong: ' + err.message;
      })
    )
  }
}
