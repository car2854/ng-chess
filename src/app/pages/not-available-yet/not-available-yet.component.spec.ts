import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableYetComponent } from './not-available-yet.component';

describe('NotAvailableYetComponent', () => {
  let component: NotAvailableYetComponent;
  let fixture: ComponentFixture<NotAvailableYetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAvailableYetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAvailableYetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
