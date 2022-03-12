import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from './../shared/payment-detail.model';
import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css'],
})
export class PaymentDetailComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshPaymentdetails();
  }
  populateForm(SelectRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, SelectRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delet this record?')) {
      this.service.deletePaymentRecord(id).subscribe(
        (res) => {
          this.service.refreshPaymentdetails();
          this.toaster.error('Deleted Successfully', 'Payment Record Deleted');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
