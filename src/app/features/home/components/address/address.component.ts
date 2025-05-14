import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-address',
  imports: [FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() address: string = '';

  toastMessage: string = '';

  constructor(private localStorage: LocalStorageService) {
    this.address = localStorage.getAddress();
  }

  Save() {
    if (!this.address.trim()) {
      this.showToast("Preencha o endereço!");
      return;
    }
    if (this.address == this.localStorage.getAddress()) {
      this.showToast("Preencha com outro endereço!");
      return;
    }

    this.localStorage.setAddress(this.address);
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('addressToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    return;
  }
}
