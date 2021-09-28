import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IsearchArtist } from 'src/app/models/searchArtist.interface';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
@ViewChild('divLiryc ') divLiryc : ElementRef;
@ViewChild('infoDiv ') divInfo: ElementRef;
@ViewChild('titleSong') titleSong:ElementRef;
@ViewChild('authorSong') authorSong:ElementRef;


  songIn:string='';
  artistIn:string='';
  error:string;

  constructor( private api:ApiService) { }

  ngOnInit(): void {
    
  }
 
  seeDates(){
    this.api.getLiryc(this.artistIn,this.songIn).subscribe(
      response=>{
        console.log(response);
        this.titleSong.nativeElement.innerHTML = this.songIn;
        this.authorSong.nativeElement.innerHTML = this.artistIn;
        this.divLiryc.nativeElement.innerHTML = `${this.formatLiryc(response.lyrics)}` ;   
        
      },(error) =>{
        console.log(error);
        this.divLiryc.nativeElement.innerHTML = `<h1 class='errorH1'>La canciòn no fue encontrada</h1>` ;
      })
      this.api.getInfo(this.artistIn).subscribe(
        data=>{
          console.log(data.artists[0].strArtist);
          this.divInfo.nativeElement.innerHTML = `${this.renderInfo(data.artists)}` ;
        },(error) =>{
        console.log(error);
        this.divInfo.nativeElement.innerHTML = `<h1 class='errorH1'>El artista no fue encontrado</h1>` ;
      })
  }
  renderInfo(artist:Array<any>):string{
    
    let infoHtml =`
      <h1 class='artistNameRes'>${artist[0].strArtist}</h1>
      <div class='imgArt'>
          <img class='artisPhoto' src="${artist[0].strArtistThumb}" alt="photo of ${artist[0].strArtist}">
      </div>
      
      <h3 class='genreMusic'>  ${artist[0].strStyle} / ${artist[0].strGenre} </h3>
      <div class='yearsInfo'>
        <small class='year'>  ${artist[0].intBornYear ? `- año de nacimiento${artist[0].intBornYear}` : ' '}</small>
        <small class='year'>  ${artist[0].intDiedYear ? `- año de muerte${artist[0].intDiedYear}` : ' '}</small>
        <small class='year'>  ${artist[0].intFormedYear ? `- inicio de carrera ${artist[0].intFormedYear}` : ' '}</small>
        <small class='year'>  ${artist[0].strDisbanded ? ` -Separacion ${artist[0].strDisbanded}` : ' '}</small>
      </div>
     
      <p class='pBio'><span class='bioSpan'>Biografia:</span> 
        ${this.formatString(artist[0].strBiographyES)}
      </p>
    `
    
    
    return infoHtml;
  }
  formatLiryc(liryc:string):string{
    let lyricHtml:string;

    lyricHtml=liryc.split('\n').join('<br>');
    return lyricHtml;
  }
  formatString(text:string):string{
    let txtFormat:string;

    txtFormat=text.split('.').join('.<br>');
    return txtFormat;
  }
}
