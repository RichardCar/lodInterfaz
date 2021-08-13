import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from '../../shared/shared-components.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { GetValuePipe } from '../../shared/pipes/get-value.pipe';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentsModule,
    FormsModule
  ]
})
export class HomeModule { }
