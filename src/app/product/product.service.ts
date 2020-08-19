import { Injectable } from '@angular/core';

import { Product } from './product.model';
import { StoreService } from './store.service';
import { UtitlityService } from '../shared/utitlity.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private storeService: StoreService,
    private utilityService: UtitlityService
  ) {}

  fetchProductDetails(productId: number): Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const productsObject = this.storeService.getProducts();

        resolve(productsObject[productId]);
      }, 1000);
    });

    return from(promise);
  }

  saveProduct(product: Product): void {
    const tempProduct = {
      ...product,
      id: product.id ? product.id : this.utilityService.generateUniqueId(),
    };
    this.storeService.addProducts(tempProduct);
  }

  updateProduct(product: Product): void {
    const tempProduct = {
      ...product,
    };
    this.storeService.addProducts(tempProduct);
  }

  fetchProducts(): Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = [...Object.values(this.storeService.getProducts())];
        resolve(products);
      }, 500);
    });
    return from(promise);
  }
}
