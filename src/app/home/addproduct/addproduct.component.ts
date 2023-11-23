import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createProductForm();
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log('Form submitted:', this.productForm.value);
      // Perform your form submission logic here
    } else {
      console.log('Form has validation errors');
      // Handle validation errors
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.productForm?.get('imageFile')?.setValue(file);
    this.productForm?.get('imagePath')?.setValue(file.name);
  }

  onCancel() {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      imageFile: [null, [Validators.required]],
      imagePath: [null],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
    });
  }
} 