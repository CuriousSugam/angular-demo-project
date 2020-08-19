import { NgModule } from '@angular/core';

import { ShortenPipe } from './shorten.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [ShortenPipe, SearchPipe],
  imports: [],
  exports: [ShortenPipe, SearchPipe],
})
export class SharedModule {}
