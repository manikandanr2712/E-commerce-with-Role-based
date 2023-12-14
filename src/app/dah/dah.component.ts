import { Component, OnInit } from '@angular/core';
import { WindowRefService } from 'src/services/window-ref.service';

declare var Razorpay: any;

@Component({
  selector: 'app-dah',
  templateUrl: './dah.component.html',
  styleUrls: ['./dah.component.scss'],
  providers: [WindowRefService]
})
export class DahComponent implements OnInit {

  constructor(private winRef: WindowRefService) {}

  ngOnInit() {}

  createRzpayOrder() {
    // Call your API to create an order and obtain the order_id
    const order_id = 'your_obtained_order_id'; // Replace this with the actual order_id

    console.log(order_id);

    // Call the payWithRazor method with the obtained order_id
    // this.payWithRazor(order_id);
  }

  payWithRazor() {
    const options: any = {
      // ... (your existing options)

 // Pass the order_id obtained from createRzpayOrder
      description: "testinf added",
      currency :"INR",
      amount: 100,
      name: "Mani",
      key: "rzp_test_7R0Rw8Mp881vmU",
      image: "https://i.imgur.com/FApqk3D.jpeg",
      prefill: {
        name: "Organic Store",
        email: "mani@gmail.com",
        phone: 9952571838
      },
      theme: {
        color: '#37254'
      },
      modal: {
        ondismiss: () => {
          console.log("dismissed");
        }
      }

      // ... (your existing options)
    };

    const successcallback = (paymentid:any) => {
      console.log("paymentid",paymentid);
    }
  
    const failurecallback = (paymentid:any) => {
      console.log("faliurecallback",paymentid);
    }
  Razorpay.open(options,successcallback,failurecallback)
  }
}