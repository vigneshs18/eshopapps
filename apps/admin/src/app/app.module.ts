import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

import { appRoutes } from './app.routes';
import { UxModule } from './ux.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';

import { ConfirmationService, MessageService } from 'primeng/api';
// import { CategoriesService, ProductsService } from '@eshopapps/products';
// import { UsersService } from '@eshopapps/users';


@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoryListComponent,
        CategoryFormComponent,
        ProductListComponent,
        ProductFormComponent,
        UserListComponent,
        UserFormComponent,
        OrderListComponent,
        OrderDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        UxModule
    ],
    providers: [
        // For Choosing India Specific Timezone - to be used with " |data" pipe
        { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {timezone: '+0530'} },
        MessageService,
        ConfirmationService,
        // CategoriesService,
        // ProductsService,
        // UsersService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
