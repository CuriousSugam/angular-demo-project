import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtitlityService {
  private ids: Array<number> = [];

  constructor() {}

  generateUniqueId(): number {
    let id = Math.ceil(Math.random() * 1000);
    if (this.ids.includes(id)) {
      id = this.generateUniqueId();
    }
    this.ids.push(id);

    return id;
  }
}
