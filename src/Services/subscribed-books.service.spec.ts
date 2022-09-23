import { TestBed } from '@angular/core/testing';

import { SubscribedBooksService } from './subscribed-books.service';

describe('SubscribedBooksService', () => {
  let service: SubscribedBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribedBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
