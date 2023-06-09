import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@eshopapps/products';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html'
})

export class CategoryFormComponent implements OnInit, OnDestroy{
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  endSubs$: Subject<void> = new Subject();

  // Object Abstraction 
  // Note: instead of using long names access to a value in HTML & TS Files use Object Abstarction
  // It is also known as getter
  get categoryForm() {
    return this.form.controls;
    // instead of using 'this.form.controls.name.value' now we can use 'this.categoryForm.name.value'
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };

    if (this.editMode) {
      this._updateCategory(category);
    }
    else {
      this._addCategory(category);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe(parems => {
      if(parems.id) {
        this.editMode = true;
        this.currentCategoryId = parems.id;
        this.categoriesService.getCategory(parems.id)
        .pipe(takeUntil(this.endSubs$))
        .subscribe({
          next: (category) =>{
            this.categoryForm.name.setValue(category.name);
            this.categoryForm.icon.setValue(category.icon);
            this.categoryForm.color.setValue(category.color);
          }
        });
      }
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category)
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: (category: Category) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is Updated` });
        timer(2000).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not Updated' });
      }
    });
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category)
    .pipe(takeUntil(this.endSubs$))
    .subscribe({
      next: (category: Category) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category ${category.name} is Created` });
        timer(2000).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category not Created' });
      }
    });
  }

}
