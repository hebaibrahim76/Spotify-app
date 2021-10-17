import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  id:string;
  albums:[];
  name:string;
  nextUrl:string;
  prevUrl:string;
  pageIndex:number;
  pageNo: number;
  length:number;
  
  constructor(private change:ChangeDetectorRef,private router:Router,private albumService:AlbumService) { }

  getName(url:string):string{
    const arr=url.split('/');
    return arr[arr.length-1].split('-').join(' ');
  }

  ngOnInit(): void {
    
    this.name=this.getName(this.router.url);
    this.id=localStorage.getItem(this.name);
    this.albumService.getAlbumResult(this.id).subscribe(res=>{
    console.log(res);
    this.prevUrl=res.previous;
    this.nextUrl=res.next;
    this.albums=res.items;
    this.pageIndex = res.offset/20;
    this.length =parseInt(''+res.total/20);
    this.change.detectChanges();
})
  }
  nextPrev(url:string){
  
   this.albumService.getNPAlbumResult(url).subscribe(res=>{
     
     this.albums=res.items;
     this.prevUrl=res.previous;
     this.nextUrl=res.next;

     this.change.detectChanges();
   })
 }
  changePage(event:any){
    
    if(event.previousPageIndex < event.pageIndex) {
      this.nextPrev(this.nextUrl);
    } else {
      this.nextPrev(this.prevUrl);
    }
  }
    
  }


