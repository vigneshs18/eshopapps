import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html'
})

export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;
  endSubs$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params.categoryId ? this._getProducts([params.categoryId]) : this._getProducts();
      params.categoryId ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService.getProducts(categoriesFilter)
    .pipe(takeUntil(this.endSubs$))
    .subscribe(products => {
      this.products = products;
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSubs$))
    .subscribe(categories => {
      this.categories = categories;
    })
  }

  categoryFilter() {
    const selectedCategory = this.categories
    .filter(category => category.checked)
    .map(category => category.id);
    // console.log(selectedCategory);

    this._getProducts(selectedCategory);
  }

}
