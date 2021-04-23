import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Confledis-miniProjet-web';


  ngOnInit(): void {



  }


  onToggle() {
    localStorage.theme = localStorage.theme == 'dark' ? 'light' : 'dark';
    console.log('working : ', localStorage.theme);

    if (localStorage.theme === 'dark') {
      console.log('in dark case')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
