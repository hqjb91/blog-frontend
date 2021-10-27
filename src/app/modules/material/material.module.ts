import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const MATERIAL = [
  MatButtonModule, MatToolbarModule, MatIconModule, 
  MatTabsModule
]

@NgModule({
  declarations: [],
  imports: MATERIAL,
  exports: MATERIAL
})
export class MaterialModule { }
