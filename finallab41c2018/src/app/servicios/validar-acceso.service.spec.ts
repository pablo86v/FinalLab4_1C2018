import { TestBed, inject } from '@angular/core/testing';

import { ValidarAccesoService } from './validar-acceso.service';

describe('ValidarAccesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidarAccesoService]
    });
  });

  it('should be created', inject([ValidarAccesoService], (service: ValidarAccesoService) => {
    expect(service).toBeTruthy();
  }));
});
