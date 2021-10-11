import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchtext:string;
  artists:[];
  flag:boolean=false;
  
  constructor(private change: ChangeDetectorRef, private router:Router) { 
  }
  
  ngOnInit(): void {
  }
 
  search(){
   
    $.ajax({
      type:'GET',
      url: 'https://api.spotify.com/v1/search?q='+this.searchtext+'&type=artist',
      headers: {
          'Authorization': 'Bearer '+localStorage.getItem('access_token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      success: (response) =>{
        
          this.artists=response.artists.items;
          this.change.detectChanges();
         
          this.flag=true;
          
          this.change.detectChanges();
      },
      error: (error)=>{
        console.log(error);
      }
      
  })
  }

}
