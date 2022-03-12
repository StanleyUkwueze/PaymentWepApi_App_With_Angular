import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css'],
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0) {
      this.insertRecord(form);
    } else {
      this.upDateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      (res: any) => {
        this.resetForm(form);
        this.service.refreshPaymentdetails();
        this.toaster.success(
          'Submitted Successfully',
          'Payment Detail Registered'
        );
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  upDateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      (res: any) => {
        this.resetForm(form);
        this.service.refreshPaymentdetails();
        this.toaster.info('Updated Successfully', 'Payment Detail Registered');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
 
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
