import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnListComponent } from './return-list.component';

describe('ReturnListComponent', () => {
  let component: ReturnListComponent;
  let fixture: ComponentFixture<ReturnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
