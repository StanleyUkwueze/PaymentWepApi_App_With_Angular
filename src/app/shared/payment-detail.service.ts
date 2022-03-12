import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  constructor(private http: HttpClient) {}
  readonly baseUrl = 'https://localhost:44319/api/PaymentDetail';
  listOfPaymentDetails!: PaymentDetail[];
  formData: PaymentDetail = new PaymentDetail();
  postPaymentDetail(): Observable<any> {
    return this.http.post(this.baseUrl, this.formData);
  }

  putPaymentDetail(): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}`, this.formData);
  }
  deletePaymentRecord(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  refreshPaymentdetails() {
    this.http
      .get(this.baseUrl)
      .toPromise()
      .then((res) => (this.listOfPaymentDetails = res as PaymentDetail[]));
  }
}
