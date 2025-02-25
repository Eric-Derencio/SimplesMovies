import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit{
  language!:string;
  languageIcons!:string;

  constructor(private languageService:LanguageService){
  }
  ngOnInit(): void {
    this.languageService.subjectObservable$.subscribe({
      next: (valor) => {
        this.language = valor[0];
        this.languageIcons = valor[1];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  setLanguage(language:string,languageIcons:string){
    this.languageService.changeLanguages(language, languageIcons);
  };

}
