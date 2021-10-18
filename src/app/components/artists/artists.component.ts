import { Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

@Input() artists:any[];

total;
  constructor() { }

  ngOnInit(): void {
    //this.total=localStorage.getItem('total');
  }
  artistAlbum(id,name){
    localStorage.setItem(name.split('-').join(' '),id);
    window.location.href= `/albums/${name.replace(/\s/g,'-')}`;
  }

}
