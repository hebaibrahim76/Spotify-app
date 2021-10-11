import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [

  {
    path: '',
    component: LogInComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'callback',
    component:AuthComponent
  },
  {
    path:'albums/:id',
    component:AlbumsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
