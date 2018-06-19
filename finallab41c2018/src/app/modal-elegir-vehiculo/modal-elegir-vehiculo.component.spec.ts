import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElegirVehiculoComponent } from './modal-elegir-vehiculo.component';

describe('ModalElegirVehiculoComponent', () => {
  let component: ModalElegirVehiculoComponent;
  let fixture: ComponentFixture<ModalElegirVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalElegirVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalElegirVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
