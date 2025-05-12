import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() address?: string;
  
  constructor(private localStorage: LocalStorageService) {
    this.address = localStorage.getAddress();
  }
}
