import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const MATERIALS = [MatIconModule, MatProgressBarModule, MatProgressSpinnerModule];
@NgModule({
  imports: [FlexLayoutModule, ...MATERIALS],
  exports: [FlexLayoutModule, ...MATERIALS],
})
export class LayoutModule {}
