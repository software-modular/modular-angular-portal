import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrappTransactionsListComponent } from './agrapp-transactions-list.component';

describe('AgrappTransactionsListComponent', () => {
  let component: AgrappTransactionsListComponent;
  let fixture: ComponentFixture<AgrappTransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgrappTransactionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgrappTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
