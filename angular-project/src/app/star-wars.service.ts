import { LogService } from './log.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';


@Injectable()
export class StarWarsService {

  private characters = [
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  private logService : LogService;
  characterChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient){
    this.logService = logService;
    this.http = http;
  }
  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
    .pipe( map( (response: HttpResponse<{}>) => {
      const data = response;
      const characters = data['results'].map(char => {
        return {name: char.name, side: ''};
      });
      return characters;
    }))
    .subscribe(
      (data) =>{
        console.log(data);
        this.characters= data;
        this.characterChanged.next();
      }
    );
  }

 getCharacters(chosenList){
    if(chosenList ==='all'){
      return this.characters.slice();
    }

    return this.characters.filter((char) =>{
      return char.side === chosenList;
    })
  }
  onSideChosen(charInfo)
  {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name
    })
    this.characters[pos].side= charInfo.side;
    this.characterChanged.next();
    this.logService.writeLog('Changed side of' + charInfo.name + ', new side: ' + charInfo.side);
  }
  addCharacter(name, side){
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (pos!== -1) {  // if we don't find it, it is going to be -1
      return;
    }

    const newChar= { name: name, side: side};
    this.characters.push(newChar);
  }
}
