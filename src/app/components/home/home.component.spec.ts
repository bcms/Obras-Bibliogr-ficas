import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let authorService: AuthorService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      providers: [
        AuthorService
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    authorService = TestBed.get(AuthorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form inválido quando vázio', () => {
    expect(component.authorForm.valid).toBeFalsy();
  });

  it('validacao do campo amountOfNames', () => {
    let errors = {};
    let amountOfNames = component.authorForm.controls['amountOfNames'];
    expect(amountOfNames.valid).toBeFalsy();

    // Campo é obrigatório
    errors = amountOfNames.errors || {};
    expect(errors['required']).toBeTruthy();

    // Atribuir qualquer incorreto para o campo
    amountOfNames.setValue("1.10");
    errors = amountOfNames.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Atribuir valor correto para o campo
    amountOfNames.setValue("1");
    errors = amountOfNames.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('validacao do campo Names', () => {
    let errors = {};
    let names = component.authorForm.controls['names'];
    expect(names.valid).toBeFalsy();

    // Campo é obrigatório
    errors = names.errors || {};
    expect(errors['required']).toBeTruthy();
  //  const compiled = fixture.debugElement.nativeElement;
  //    expect(compiled.querySelector('.content span').textContent).toContain('obras-bibliograficas app is running!');


    // Atribuir valor correto para o campo
    names.setValue("Paulo Cesar Campos");
    errors = names.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('formatar nomes e exibir resultado no alert', () => {
    let amountOfNames = component.authorForm.controls['amountOfNames'];
    let names = component.authorForm.controls['names'];

    //Nenhum valor passado exibe validaçoes e não exibe mensagem do alert
    window.alert = jasmine.createSpy();
    component.formatNames();
    expect(window.alert).toHaveBeenCalledTimes(0);

    //Validar número incorreto de autores
    amountOfNames.setValue(1);
    names.setValue('José da Silva\nCelso Campos');
    window.alert = jasmine.createSpy();
    component.formatNames();
    expect(window.alert).toHaveBeenCalledWith('A quantidade de autores não condiz com os nomes informados.');

    //Validar chamada ao service e mensagem de retorno
    amountOfNames.setValue(2);
    names.setValue('José da Silva\nCelso Campos');
    spyOn(authorService, 'getNameFormatted')
      .withArgs('José da Silva').and.returnValue('SILVA, José da')
      .withArgs('Celso Campos').and.returnValue('CAMPOS, Celso');
    window.alert = jasmine.createSpy();
    component.formatNames();
    expect(window.alert).toHaveBeenCalledWith('Nomes formatados:\n\nSILVA, José da\nCAMPOS, Celso');
  });

});
