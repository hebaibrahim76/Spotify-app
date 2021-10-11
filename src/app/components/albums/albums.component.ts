import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  id:string;
  albums:[];
  name:string;

  constructor(private change:ChangeDetectorRef,private router:Router) { }

  getID(url:string):string{
    const arr=url.split('/');
    return arr[arr.length-1];
  }
  ngOnInit(): void {
    
    this.id=this.getID(this.router.url)
    $.ajax({
      type:'GET',
      url: `https://api.spotify.com/v1/artists/${this.id}/albums`,
      headers: {
          'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      success: (response) =>{
        this.name=localStorage.getItem('artist_name');
        this.change.detectChanges();
          
          this.albums=response.items;
          
          this.change.detectChanges();
      },
      error: (error)=>{
        console.log(error);
      }
      
  })
  }

}
