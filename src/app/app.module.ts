import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule} from '@angular/forms'
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { QuoterComponent } from './components/quoter/quoter.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { FooterComponent } from './components/footer/footer.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es-CO';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent,
    ProgressBarComponent,
    QuoterComponent,
    PdfComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
