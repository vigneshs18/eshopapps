import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@eshopapps/products';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html'
})

export class CategoryListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSub$: Subject<void> = new Subject();

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }

  private _getCategories() {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe((response) => {
      this.categories = response;
    });
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId)
        .pipe(takeUntil(this.endSub$))
        .subscribe({
          next: () => {
            this._getCategories();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is Deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not Deleted' });
          }
        });
      }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

}
