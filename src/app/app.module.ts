import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CurrencyDirective } from './currency.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [AppComponent, CurrencyDirective],
  bootstrap: [AppComponent],
  providers: [CurrencyPipe],
})
export class AppModule {}
