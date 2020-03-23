import { Component } from '@angular/core';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StarWarsService]
})
export class AppComponent {
  title = 'angular-project';
}
