import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  chsosenList = 'all';

  constructor() { }

  ngOnInit(): void {
  }
  onChoose(side){
    this.chsosenList = side;
  }
  getCharacters(){
    if(this.chsosenList ='all'){
      return this.chsosenList.slice();
    }
    return this.characters.filter((char) =>{
      return char.side === this.chsosenList;
    })
  }

}
