import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportpageComponent } from './reportpage.component';

describe('ReportpageComponent', () => {
  let component: ReportpageComponent;
  let fixture: ComponentFixture<ReportpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
