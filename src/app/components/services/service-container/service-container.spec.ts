import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContainer } from './service-container';

describe('ServiceContainer', () => {
  let component: ServiceContainer;
  let fixture: ComponentFixture<ServiceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
