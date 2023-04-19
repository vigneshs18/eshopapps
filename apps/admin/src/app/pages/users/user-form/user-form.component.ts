import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, User } from '@eshopapps/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserId: string;
  countries = [];

  get userForm() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initUserForm();
    this._getCountryList();
    this._checkEditMode();
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }

  private _getCountryList() {
    this.countries = this.usersService.getCountries();
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);
          // In Edit Mode Password can be blank
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {

    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value
    };

    if(this.editMode) {
      this._updateUser(user);
    }
    else {
      this._addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} is Created` });
        timer(2000).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User not Created' });
      }
    });
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe({
      next: (user: User) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `User ${user.name} is Updated` });
        timer(2000).subscribe(() => {
          this.location.back();
        })
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not Updated' });
      }
    });
  }

}
