import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { debounceTime,distinctUntilChanged,map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

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

  pageIndex:number;
  pageNo: number
  length:number;

  constructor(private change: ChangeDetectorRef, private seachService:SearchService) {     
  }

  ngOnInit(): void {
    this.pageNo=0;
    

    fromEvent(this.searchInput.nativeElement, 'input').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })

      , debounceTime(1000)

      // If previous query is diffent from current   
      , distinctUntilChanged()


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

    this.seachService.getNPSearchResult(url).subscribe(res=>{

      this.artists=res.artists.items;
      this.prevUrl=res.artists.previous;
      this.nextUrl=res.artists.next;

      
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

