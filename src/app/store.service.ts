import { Injectable } from '@angular/core';

import { Product } from './product/product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // Default values temporarily assigned to see a list of products in list page.
  // Need to fetch these from server after api integraiton.
  private products: { [id: number]: Product } = {
    12334: {
      id: 12334,
      name: 'Dell XPS',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit fugit porro corrupti, cum veniam alias quae, nihil esse ea placeat, deserunt consequatur cupiditate earum obcaecati possimus rerum? Fuga, consequuntur.',
      code: 'STG-123',
      images: ['https://source.unsplash.com/random'],
    },
    123456789: {
      id: 123456789,
      name: 'Laptop Cooler',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit fugit porro corrupti, cum veniam alias quae, nihil esse ea placeat, deserunt consequatur cupiditate earum obcaecati possimus rerum? Fuga, consequuntur.',
      code: 'STG-00-123',
      images: ['https://picsum.photos/200'],
    },
    12564: {
      id: 12564,
      name: 'Magnifying Glass',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit fugit porro corrupti, cum veniam alias quae, nihil esse ea placeat, deserunt consequatur cupiditate earum obcaecati possimus rerum? Fuga, consequuntur.',
      code: 'MAG-34-123',
      images: ['https://loremflickr.com/320/240'],
    },
    980987: {
      id: 980987,
      name: 'Iphone Cover',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit fugit porro corrupti, cum veniam alias quae, nihil esse ea placeat, deserunt consequatur cupiditate earum obcaecati possimus rerum? Fuga, consequuntur.',
      code: 'APP-40-233',
      images: ['https://picsum.photos/200'],
    },
    676756: {
      id: 676756,
      name: 'Dirt Helmet',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus velit fugit porro corrupti, cum veniam alias quae, nihil esse ea placeat, deserunt consequatur cupiditate earum obcaecati possimus rerum? Fuga, consequuntur.',
      code: 'HEL-233-44',
      images: ['https://source.unsplash.com/random'],
    },
  };

  constructor() {}

  addProducts(product: Product): void {
    let imageUrl = product.images || [];
    product.images.map((i) => {
      if (typeof i === 'object') {
        imageUrl = [i.url];
      }
    });

    this.products[product.id] = {
      ...product,
      images: imageUrl,
    };
  }

  getProducts(): { [id: number]: Product } {
    return this.products;
  }
}
