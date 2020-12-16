import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppnotificationsComponent } from './appnotifications.component';

describe('AppnotificationsComponent', () => {
  let component: AppnotificationsComponent;
  let fixture: ComponentFixture<AppnotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppnotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
