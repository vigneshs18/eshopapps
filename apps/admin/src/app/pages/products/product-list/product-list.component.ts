import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Product, ProductsService } from '@eshopapps/products';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProducts() {
    this.productsService.getProducts()
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: response => {
        this.products = response;
      }
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe({
          next: () => {
            this._getProducts();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is Deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not Deleted' });
          }
        });
      }
    });
  }
  
}
