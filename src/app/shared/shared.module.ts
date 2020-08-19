import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenPipe } from './shorten.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [ShortenPipe, SearchPipe],
  imports: [CommonModule],
  exports: [ShortenPipe, SearchPipe],
})
export class SharedModule {}
