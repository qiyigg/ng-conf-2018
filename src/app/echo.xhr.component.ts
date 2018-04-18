import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare interface HttpResponse {
    data: string;
}

@Component({
  selector: 'echo',
  templateUrl: 'echo.xhr.component.html'
})
@Injectable()
export class XHREchoComponent {
    input: string;
    echo: string;
    
    constructor(private http: HttpClient) {
        this.echo = '';
    }

    updateEcho() {
        console.log('Fetching data');
        // Update echo
        this.getEcho().subscribe((echo) => {
            this.echo = echo;
        });
    }

    getEcho() : Observable<string> {
        const resp = this.http.get('./assets/echo.json');
        return resp.pipe(map((response: HttpResponse) => {
            return response.data;
        }));
    }
}