import { Route } from '@angular/router';

import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';
import { AuthGaurd } from '@eshopapps/users';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGaurd],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoryListComponent
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoryFormComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/form',
        component: ProductFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductFormComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/form',
        component: UserFormComponent
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent
      },
      {
        path: 'orders',
        component: OrderListComponent
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent
      }
    ]
  }
];
