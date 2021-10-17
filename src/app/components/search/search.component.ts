import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime,distinctUntilChanged,map,filter } from 'rxjs/operators';
import { Observable, Subject,fromEvent } from 'rxjs';
import { Location } from '@angular/common'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  searchtext:string;
  artists:[];
  flag:boolean=false;

  nextUrl:string;
  prevUrl:string;
  pageEvent: PageEvent;

  pageIndex:number;
  pageNo: number
  length:number;
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private change: ChangeDetectorRef, private seachService:SearchService) { 
    
  }



  
  ngOnInit(): void {
    this.pageNo=0;
    console.log(this.searchInput);

    fromEvent(this.searchInput.nativeElement, 'input').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe(text=> {
      
      this.searchtext=text
      this.search()

  })
}
 

  search(){
    if(this.searchtext){
    this.seachService.getSearchResult(this.searchtext).subscribe(res=>{
      
      console.log(res);
      this.artists=res.artists.items;
      this.nextUrl=res.artists.next;
      this.prevUrl=res.artists.previous;
      this.flag=true;
      
      this.pageIndex = res.artists.offset/20;
      this.length =parseInt(''+res.artists.total/20);
      
      this.change.detectChanges();
    })
  }
  else{
    this.artists=[];
    this.flag=false;
  }
  }
  nextPrev(url:string){
     //console.log(url);
    this.seachService.getNPSearchResult(url).subscribe(res=>{
     // console.log(res);
      
      this.artists=res.artists.items;
      this.prevUrl=res.artists.previous;
      this.nextUrl=res.artists.next;
      
      //console.log(response.artists.previous);
      //console.log("prev "+this.prevUrl);
      
      this.change.detectChanges();
    })
  }

  changePage(event:any){
    
    if(event.previousPageIndex < event.pageIndex) {
      this.nextPrev(this.nextUrl);
      //console.log('next');
      

    } else {
      this.nextPrev(this.prevUrl);
      //console.log('prev');
    }
  }

  }

