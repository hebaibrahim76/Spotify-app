import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

@Input() artists:any[];

total;
  constructor(private change: ChangeDetectorRef,private router:Router) { }

  ngOnInit(): void {
    this.total=localStorage.getItem('total');
  }
  artistAlbum(id,name){
    localStorage.setItem(name.split('-').join(' '),id);
    window.location.href= `/albums/${name.replace(/\s/g,'-')}`;
  }

}
