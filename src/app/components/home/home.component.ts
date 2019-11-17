import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authorForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private formBuilder: FormBuilder
  ) {
    this.authorForm = this.formBuilder.group({
      'amountOfNames': this.formBuilder.control(null, [
        Validators.required,
        Validators.pattern("^(-?[1-9]+\d*)$|^0$")
      ]),
      'names': this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  formatNames() {
    if (this.authorForm.valid) {

      let amountOfNames: number = this.authorForm.controls['amountOfNames'].value;
      let names: string = this.authorForm.controls['names'].value;
      let authors = names.split('\n');

      if (authors.length != amountOfNames)
        alert('A quantidade de autores não condiz com os nomes informados.');
      else {
        var sucessMsg = 'Nomes formatados:\n';
        for (let i = 0; i < authors.length; i++)
          sucessMsg += '\n' + this.authorService.getNameFormatted(authors[i]);

        alert(sucessMsg);
      }


    }
  }

}
