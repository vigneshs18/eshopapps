import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { UxModule } from './ux.module';
import { ProductsModule } from '@eshopapps/products';
import { UiModule } from '@eshopapps/ui';
import { OrdersModule } from '@eshopapps/orders';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';

import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessagesComponent
    ],
    imports: [
        BrowserModule, 
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        UxModule,
        ProductsModule,
        UiModule,
        OrdersModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
