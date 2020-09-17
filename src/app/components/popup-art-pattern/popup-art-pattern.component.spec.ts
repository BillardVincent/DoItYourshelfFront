import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArtPatternComponent } from './popup-art-pattern.component';

describe('PopupArtPatternComponent', () => {
  let component: PopupArtPatternComponent;
  let fixture: ComponentFixture<PopupArtPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupArtPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArtPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
