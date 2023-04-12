import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, Product, ProductsService } from '@eshopapps/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html'
})

export class ProductFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentProductId: string;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer;

  get productForm() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe(parems => {
      if(parems.id) {
        this.editMode = true;
        this.currentProductId = parems.id;
        this.productsService.getProduct(parems.id).subscribe({
          next: (product) =>{
            this.productForm.name.setValue(product.name);
            this.productForm.category.setValue(product.category.id);
            this.productForm.brand.setValue(product.brand);
            this.productForm.price.setValue(product.price);
            this.productForm.countInStock.setValue(product.countInStock);
            this.productForm.isFeatured.setValue(product.isFeatured);
            this.productForm.description.setValue(product.description);
            this.productForm.richDescription.setValue(product.richDescription);
            this.imageDisplay = product.image;
            this.productForm.image.setValidators([]);
            this.productForm.image.updateValueAndValidity();
          }
        });
      }
    });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // for image uploads the form data need to be managed in differently (below 2 lines)
      // It will patch the value of 'image file' itself otherwise only 'image path' will get appended in formData
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      // this "readAsDataURL() must come at last for proper working"
      fileReader.readAsDataURL(file);
    }
  }

  onSubmit() {

    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();

    // Looping throught entire productFrom Controls, to Avoid Repetation like
    // productFormData.append('name', this.productForm.name.value);
    Object.keys(this.productForm).map((key) => {
      // console.log(key);
      // console.log(this.productForm[key].value);
      productFormData.append(key, this.productForm[key].value);
    });

    if(this.editMode) {
      this._updateProduct(productFormData);
    }
    else {
      this._addProduct(productFormData);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe({
      next: (product: Product) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is Created` });
        timer(2000).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product not Created' });
      }
    });
  }

  private _updateProduct(productData: FormData) {
    this.productsService.updateProduct(productData, this.currentProductId).subscribe({
      next: (product: Product) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product ${product.name} is Updated` });
        timer(2000).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not Updated' });
      }
    });
  }

}
