import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrdersComponent } from './confirm-orders.component';

describe('ConfirmOrdersComponent', () => {
  let component: ConfirmOrdersComponent;
  let fixture: ComponentFixture<ConfirmOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
