import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { Product } from '../product.model';

import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  productForm: FormGroup;
  formValues: Product = {
    name: '',
    code: '',
    description: '',
  };
  files: { name: string; url: any }[] = [];

  formName: string = 'Add Product';
  editMode: boolean = false;
  productId: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const productId = params['id'];
      if (productId !== undefined && productId !== null) {
        this.formName = 'Edit Product';
        this.editMode = true;
        this.productId = parseInt(productId, 10);
      }
      this.initForm();
    });
  }

  initForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl(this.formValues.name, Validators.required),
      code: new FormControl(this.formValues.code, Validators.required),
      description: new FormControl(this.formValues.description),
      images: new FormControl(''),
    });

    if (this.editMode) {
      this.productService
        .fetchProductDetails(this.productId)
        .subscribe((value) => {
          this.productForm.setValue({
            name: value.name,
            code: value.code,
            description: value.description,
            images: '',
          });
          this.formValues = value;
        });
    }
  }

  async selectFiles(event) {
    for (let file of event.target.files) {
      let imageURL = await new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          resolve(reader.result);
        };
      });
      this.files.push({
        name: file.name,
        url: imageURL,
      });
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct({
        ...this.productForm.value,
        images: this.files.length === 0 ? this.formValues.images : this.files,
        id: this.productId,
      });
    } else {
      this.productService.saveProduct({
        ...this.productForm.value,
        images: this.files,
      });
    }
    this.reset();
    this.location.back();
  }

  reset() {
    this.productForm.reset();
    this.formDirective.resetForm();
  }
}
