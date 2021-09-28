import { Injectable } from '@angular/core';
import { IresponseLiryc }  from '../../models/responseLiryc.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';
import { IsearchArtist } from 'src/app/models/searchArtist.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  lirycUrl:string = "https://api.lyrics.ovh/v1/"
  infoArtistUrl:string="http://theaudiodb.com/api/v1/json/1/search.php?s="

  
  constructor(private http:HttpClient) { }

  getLiryc(artist:string,title:string):Observable<IresponseLiryc>{
    let dir = `${this.lirycUrl}/${artist}/${title}`
    return this.http.get<IresponseLiryc>(dir)
        .pipe(
          catchError(this.handleError)
        );
  }
  getInfo(artistName:string):Observable<any>{
    let dirA =`${this.infoArtistUrl}${artistName}`;
    return this.http.get<any>(dirA)
      .pipe(
        catchError(this.handleError)
      );

  }
  private handleError(error: HttpErrorResponse){
  
    return throwError(error.message);
  }
}
