import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DahComponent } from './dah.component';

describe('DahComponent', () => {
  let component: DahComponent;
  let fixture: ComponentFixture<DahComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DahComponent]
    });
    fixture = TestBed.createComponent(DahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
