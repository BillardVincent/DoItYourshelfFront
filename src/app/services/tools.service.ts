import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Format } from '../classes/format';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private readonly FORMATS = 'formats';
  private readonly URL = `http://localhost:8080/other`;

  constructor(private http: HttpClient) { }

  FnUlist: Format[];


  loadLocalStorage() {
    //this.FnUlist = JSON.parse(localStorage.getItem('formats'));
    //if( this.FnUlist.length = 0){
    this.getFormatsAndUnits().subscribe(
      (data: Format[]) => {
        this.FnUlist = data;
        localStorage.setItem(this.FORMATS, JSON.stringify(this.FnUlist));
      }
    );
//    }


  }
    public getFormatsAndUnits(): Observable<Format[]> {
      return this.http.get<Format[]>(`${this.URL}/formatsandunits`).pipe(
        map((formatList: Format[]) => {
          return formatList.map((format: Format) => {
            return new Format(format);
          });

        })
      );


    }

}
