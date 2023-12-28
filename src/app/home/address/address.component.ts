import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AddressService, City, Country, State } from 'src/services/address.service';
import { CartServiceService } from 'src/services/cart-service.service';
import { WindowRefService } from 'src/services/window-ref.service';

declare var Razorpay: any;
export interface AddressModel {
  name: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
}


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit, OnDestroy {
  addressForm!: FormGroup;
  private destroy$ = new Subject<void>();
  countries: any = [];
  states: any = [];
  cities: City[] = [];
  userData: any;
  addressList: any;
  country: any;
  cityName: any;
  stateName: any;

  showForm: boolean = false;
  userId: any;
  cartItems: any[];
  private cartItemsSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private addressService: AddressService,
    private snackBar: MatSnackBar, private router: Router, private winRef: WindowRefService,
    private cartService: CartServiceService) {
    const userdataString = sessionStorage.getItem('user-detail');
    const decodedToken = userdataString ? JSON.parse(userdataString) : null;
    this.userId = decodedToken.userId;
  }

  ngOnInit() {
    this.initForm();
    this.loadCountries();
    var jsonString = sessionStorage.getItem('user-detail');
    if (jsonString !== null) {
      this.userData = JSON.parse(jsonString);
    }
    this.getAddress();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    // Initialize empty arrays for states and cities
    this.states = [];
    this.cities = [];

  }
  loadCountries(): void {
    this.addressService.getCountries().subscribe(
      (countries: Country[]) => {
        this.countries = countries;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  loadStates(): void {
    const selectedCountryId = this.addressForm.get('country')?.value;
    if (selectedCountryId) {
      this.addressService.getStatesByCountryId(selectedCountryId).subscribe(
        (states: State[]) => {
          this.states = states;
          this.addressForm.get('state')?.reset();
          this.addressForm.get('city')?.reset();
        },
        (error) => {
          console.error('Error fetching states:', error);
        }
      );
    } else {
      // Reset states and cities if no country is selected
      this.states = [];
      this.cities = [];
      this.addressForm.get('state')?.reset();
      this.addressForm.get('city')?.reset();
    }
  }

  loadCities(): void {
    const selectedStateId = this.addressForm.get('state')?.value;
    if (selectedStateId) {
      this.addressService.getCitiesByStateId(selectedStateId).subscribe(
        (cities: City[]) => {
          this.cities = cities;
          this.addressForm.get('city')?.reset();
        },
        (error) => {
          console.error('Error fetching cities:', error);
        }
      );
    } else {
      // Reset cities if no state is selected
      this.cities = [];
      this.addressForm.get('city')?.reset();
    }
  }

  onSubmit(): void {
    const newAddress = {
      UserId: this.userData.userId,
      Name: this.addressForm.value.name,
      Mobile: this.addressForm.value.mobile,
      Email: this.addressForm.value.email,
      Country: this.addressForm.value.country.toString(),
      State: this.addressForm.value.state.toString(),
      City: this.addressForm.value.city.toString(),
      Street: this.addressForm.value.street,
      ZipCode: this.addressForm.value.zipCode,
    };
    if (this.addressForm.valid) {
      // Handle form submission
      this.addressService.saveAddress(newAddress).subscribe((res: any) => {
        console.log('Form submitted:', res);
        this.snackBar.open(`Shipping Address Added Successfuly`, 'Close', { duration: 2000 });
        this.showForm = false;
        this.getAddress();
      },
        err => {
          this.snackBar.open(`${err.error}`, 'Close', { duration: 2000 });
        }
      )
    }
  }

  // clear() {
  //   this.addressForm.reset();
  //   Object.keys(this.addressForm.controls).forEach((key) => {
  //     const control = this.addressForm.get(key);
  //     control?.markAsPristine();
  //     control?.markAsUntouched();
  //   });
  // }

  getAddress() {
    this.addressService.getAddress(this.userData?.userId).subscribe(
      (res: any) => {
        this.addressList = res.$values.length > 0 ? res.$values : this.toggleFormVisibility() ;

        // Loop through each address in the list
        this.addressList?.forEach((address: any) => {
          const countryId = parseInt(address.country, 10);
          const stateId = parseInt(address.state, 10);
          const cityId = parseInt(address.city, 10);
          // Find the country in the countries list based on the ID
          const country = this.countries.find((c: any) => c.id === countryId);
          address.countryName = country?.name;
          this.addressService.getStatesByCountryId(countryId).subscribe(
            (states: State[]) => {
              this.stateName = states.find((c: any) => c.id === stateId);
              address.stateName = this.stateName?.name;
            },
            (error) => {
              console.error('Error fetching states:', error);
            }
          );

          this.addressService.getCitiesByStateId(stateId).subscribe(
            (cities: City[]) => {
              this.cityName = cities.find((c: any) => c.id === cityId);
              if (this.cityName)
                address.cityName = this.cityName?.name;
            },
            (error) => {
              console.error('Error fetching cities:', error);
            }
          );
        });

      },
      err => {
        this.snackBar.open(`${err.error}`, 'Close', { duration: 2000 });
      }
    );
  }
  toggleFormVisibility(): void {
    console.log("da")
    this.showForm = true;
    if (!this.showForm) {
      this.clearForm(); // Optionally clear the form when hiding it
    }
  }
  clearForm(): void {
    this.addressForm.reset(); // Reset the form controls
  }

  onRadioChange(event: any) {
    // 'event.value' will give you the selected address object
    console.log('Selected Address:', event.value);
    // You can use 'event.value' to access individual properties, e.g., event.value.street, event.value.cityName, etc.
  }
  cancel() {
    this.showForm = false;
  }
  completeOrder() {
    
    var data = this.cartService.TotalPrice ?(this.cartService.TotalPrice)*100 : 100 ;
    // this.router.navigate(['dashboard/complete-order'])
    const options: any = {
      description: "testinf added",
      currency: "INR",
      amount: data,
      name: "Mani",
      key: "rzp_test_7R0Rw8Mp881vmU",
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
      },
     
      // ... (your existing options)
    };
    options.handler = ((response) => {
      var pay_id = response.razorpay_payment_id;
      console.log("moon",pay_id)
      this.delete(pay_id)
   });

    const successcallback = (paymentid: any) => {
      console.log('Razorpay success callback triggered. Payment ID:', paymentid);
      // options.callback_url = this.delete();
      
    }

    const failurecallback = (paymentid: any) => {
      console.log("faliurecallback", paymentid);
    }
    Razorpay.open(options, successcallback, failurecallback)
  }
  updateCart(item?: any): void {
    this.cartService.updateCart(this.cartItems).subscribe((response: any) => {
      this.cartItems = response.$values;
    });
  }

  getCart() {
    // Unsubscribe from previous subscription if exists
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }

    this.cartItemsSubscription = this.cartService.getCart(this.userId).subscribe((response: any) => {
      this.cartItems = response.$values;
      this.cartService.updateCartCount(0);
    });
  }
  back() {
    this.router.navigate(['dashboard/add-to-cart']);
  }
  delete(id) {
    this.cartService.deleteAllCartItems(this.userId).subscribe({
      next: (response: any) => {
        console.log('All items deleted successfully');
        if (response.success) {
          this.getCart();
          this.cartItems = [];
          this.updateCart(this.cartItems);
          this.router.navigate(['/dashboard']);
        } else {
          console.error(response.message);
        }
      },
      error: (error: any) => {
        console.error('Error deleting all items:', error);
      }
    });
  }
}  
