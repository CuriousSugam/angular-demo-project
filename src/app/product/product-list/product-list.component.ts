import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../product.model';
import { Router } from '@angular/router';

import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  products: Array<Product>;
  productsSubscription: Subscription;
  isLoading: boolean;

  searchString = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsSubscription = this.productService
      .fetchProducts()
      .subscribe((products) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  onProductClick(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  onAddProduct(): void {
    this.router.navigate(['/products/new']);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
