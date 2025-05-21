import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-address-modal',
  imports: [FormsModule],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss',
})
export class AddressModalComponent {
  address: string = '';

  toastMessage: string = '';

  constructor(private localStorage: LocalStorageService) {
    this.address = localStorage.getAddress();
    console.log(this.address);
  }

  Save() {
    if (!this.address.trim()) {
      this.showToast('Preencha o endereço!');
      return;
    }
    if (this.address == this.localStorage.getAddress()) {
      this.showToast('Preencha com outro endereço!');
      return;
    }

    this.localStorage.setAddress(this.address);
    const modalEl = document.getElementById('addressModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  }

  showToast(message: string) {
    this.toastMessage = message;
    const toastEl = document.getElementById('addressToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    return;
  }
}
