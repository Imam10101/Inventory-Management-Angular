import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamageComponent } from './add-damage.component';

describe('AddDamageComponent', () => {
  let component: AddDamageComponent;
  let fixture: ComponentFixture<AddDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDamageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
