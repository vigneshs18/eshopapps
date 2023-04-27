import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

import { UsersService, User } from '@eshopapps/users';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  endSubs$: Subject<void> = new Subject();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getUsers() {
    this.usersService.getUsers()
    .pipe(takeUntil(this.endSubs$))
    .subscribe((response) => {
      this.users = response;
    });
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
      return this.usersService.getCountry(countryKey);
    }
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId)
        .pipe(takeUntil(this.endSubs$))
        .subscribe({
          next: () => {
            this._getUsers();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is Deleted' });
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not Deleted' });
          }
        });
      }
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }

}
