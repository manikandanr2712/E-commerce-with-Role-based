import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRefService } from 'src/services/window-ref.service';

declare var Razorpay: any;
@Component({
  selector: 'app-completeorder',
  templateUrl: './completeorder.component.html',
  styleUrls: ['./completeorder.component.scss']
})
export class CompleteorderComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  payWithRazor() {
    this.router.navigate(['dashboard'])
    };
}
