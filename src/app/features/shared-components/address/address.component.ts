import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  address: string = '';
  private subscription: Subscription;

  constructor(private localStorage: LocalStorageService) {
    this.subscription = this.localStorage.address$.subscribe((value) => {
      this.address = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
