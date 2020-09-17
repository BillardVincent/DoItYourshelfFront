import { TestBed } from '@angular/core/testing';

import { ArticlePatternService } from './article-pattern.service';

describe('ArticlePatternService', () => {
  let service: ArticlePatternService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlePatternService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
