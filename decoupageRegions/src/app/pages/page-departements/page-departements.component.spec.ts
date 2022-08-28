import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDepartementsComponent } from './page-departements.component';

describe('PageDepartementsComponent', () => {
  let component: PageDepartementsComponent;
  let fixture: ComponentFixture<PageDepartementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDepartementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDepartementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
