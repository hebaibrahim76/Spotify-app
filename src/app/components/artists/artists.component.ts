import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  
@Input() artists:any[];

  constructor(private change: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  artistAlbum(id,name){
    localStorage.setItem('artist_name',name);
    window.location.href= `/albums/${id}`;
  }
}
