import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesClientesComponent } from './viajes-clientes.component';

describe('ViajesClientesComponent', () => {
  let component: ViajesClientesComponent;
  let fixture: ComponentFixture<ViajesClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
