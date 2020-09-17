import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArticleComponent } from './popup-article.component';

describe('PopupArticleComponent', () => {
  let component: PopupArticleComponent;
  let fixture: ComponentFixture<PopupArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
