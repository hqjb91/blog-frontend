import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

const MATERIAL = [
  MatButtonModule, MatToolbarModule, MatIconModule, 
  MatCardModule, MatPaginatorModule
]

@NgModule({
  declarations: [],
  imports: MATERIAL,
  exports: MATERIAL
})
export class MaterialModule { }
