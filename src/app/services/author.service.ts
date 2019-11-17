import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private readonly generationNames: string[] = ["FILHO", "FILHA", "NETO", "NETA", "SOBRINHO", "SOBRINHA", "JUNIOR"];
  private readonly prepositions: string[] = ["da", "de", "do", "das", "dos"];

  getNameFormatted(name: string): string {

    if (!name)
      return name;

    let firstNameSplitted = name.split(' ');
    let surname = firstNameSplitted.pop();

    if (this.generationNames.indexOf(surname.toUpperCase()) >= 0 && firstNameSplitted.length > 1)
      surname = firstNameSplitted.pop().toUpperCase() + ' ' + surname;

    for (let i = 0; i < firstNameSplitted.length; i++) {
      let item = firstNameSplitted[i];

      if (this.prepositions.indexOf(item.toLowerCase()) == -1)
        firstNameSplitted[i] = item.substring(0, 1).toUpperCase() + item.substring(1, item.length).toLowerCase();
      else
        firstNameSplitted[i] = item.toLowerCase();
    }

    let formatted = surname.toUpperCase();

    if (firstNameSplitted.length > 0)
      formatted += ', ' + firstNameSplitted.join(' ');

    return formatted;
  }

  constructor() { }
}
