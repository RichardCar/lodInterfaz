import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GetValuePipe } from './pipes/get-value.pipe';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, GetValuePipe],
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent, FooterComponent, GetValuePipe]
})
export class SharedComponentsModule { }
