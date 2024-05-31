import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationtableComponent } from './designationtable.component';

describe('DesignationtableComponent', () => {
  let component: DesignationtableComponent;
  let fixture: ComponentFixture<DesignationtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationtableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignationtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
