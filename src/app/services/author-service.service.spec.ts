import { TestBed } from '@angular/core/testing';

import { AuthorServiceService } from './author-service.service';

describe('AuthorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);
    expect(service).toBeTruthy();
  });

  it('sobrenome é a última parte do nome em letra maiúscula', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);

    expect(service.getNameFormatted('Paulo Antonio Silva')).toEqual('SILVA, Paulo Antonio');
  });

  it('se houver apenas uma parte do nome deve ser apresentada em letras maiusculas', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);

    expect(service.getNameFormatted('Joaquim')).toEqual('JOAQUIM');
  });

  it('se última parte for "FILHO", "FILHA", "NETO", "NETA", "SOBRINHO", "SOBRINHA" ou "JUNIOR" e houver duas ou mais partes antes, a penúltima parte fará parte do sobrenome', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);

    expect(service.getNameFormatted('João Silva Neto')).toEqual('SILVA NETO, João');
    expect(service.getNameFormatted('João Neto')).toEqual('NETO, João');
  });

  it('as partes que não fazem parte do sobrenome devem ser impressas com inicial maiúscula e demais minúsculas', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);

    expect(service.getNameFormatted('manuEl carreira')).toEqual('CARREIRA, Manuel');
  });

  it('"da", "de", "do", "das" e "dos" devem ser minúsculas', () => {
    const service: AuthorServiceService = TestBed.get(AuthorServiceService);

    expect(service.getNameFormatted('celso DE araujo')).toEqual('ARAUJO, Celso de');
  });
});
