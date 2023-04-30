import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html'
})

export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getFeaturedProducts() {
    this.productsService.getFeaturedProducts(4)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(products => {
      this.featuredProducts = products;
    })
  }

}
