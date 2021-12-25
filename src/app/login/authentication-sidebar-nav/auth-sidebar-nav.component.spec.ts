import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSidebarNavComponent } from './auth-sidebar-nav.component';

describe('AuthenticationButtonComponent', () => {
  let component: AuthSidebarNavComponent;
  let fixture: ComponentFixture<AuthSidebarNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSidebarNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSidebarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
