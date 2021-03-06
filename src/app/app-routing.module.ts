import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent }from '../app/views/search/search.component';
const routes: Routes = [
  {path:'', redirectTo:'search', pathMatch:'full'},
  {path:'search', component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [SearchComponent]