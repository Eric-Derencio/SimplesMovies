import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: string = 'pt_BR';
  iconLanguage: string = 'fi fi-br';
  subjectRes = new BehaviorSubject<[string, string]>(['pt-BR', 'fi fi-br']);
  subjectObservable$ = this.subjectRes.asObservable();

  constructor() {}

  public changeLanguages(language: string, iconLanguage: string): void {
    this.language = language;
    this.iconLanguage = iconLanguage;

    this.subjectRes.next([language, iconLanguage]);
  }
}
