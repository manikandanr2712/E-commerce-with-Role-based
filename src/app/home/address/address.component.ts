import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { AddressService, City, Country, State } from 'src/services/address.service';

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
 

  constructor(private fb: FormBuilder, private addressService: AddressService,private snackBar: MatSnackBar) { }

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
    console.log(selectedStateId, "selecetedcou")
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
    console.log('Form new add:', newAddress);
    if (this.addressForm.valid) {
      // Handle form submission
      this.addressService.saveAddress(newAddress).subscribe((res: any) => {
        console.log('Form submitted:', res);
        this.snackBar.open(`Shipping Address Added Successfuly`, 'Close', { duration: 2000 });
        this.addressForm.reset();
      },
      err => {
        this.snackBar.open(`${err.error}`, 'Close', { duration: 2000 });
      }
      )
    }
  }

  clear() {
    this.addressForm.reset();
    Object.keys(this.addressForm.controls).forEach((key) => {
      const control = this.addressForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  getAddress() {
    this.addressService.getAddress(this.userData?.userId).subscribe((res:any) => {
      console.log('List:', res);
    },
    err => {
      this.snackBar.open(`${err.error}`, 'Close', { duration: 2000 });
    })
  }
}