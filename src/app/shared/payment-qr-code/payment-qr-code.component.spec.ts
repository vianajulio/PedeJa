import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentQrCodeComponent } from './payment-qr-code.component';

describe('PaymentQrCodeComponent', () => {
  let component: PaymentQrCodeComponent;
  let fixture: ComponentFixture<PaymentQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentQrCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
