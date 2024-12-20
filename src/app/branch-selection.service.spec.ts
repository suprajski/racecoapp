import { TestBed } from '@angular/core/testing';

import { BranchSelectionService } from './branch-selection.service';

describe('BranchSelectionService', () => {
  let service: BranchSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
