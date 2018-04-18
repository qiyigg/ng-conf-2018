import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'echo',
  templateUrl: 'echo.debounced.component.html'
})
export class DebouncedEchoComponent {

    input: string;
    echo: string;
    valueChanged = new Subject<string>();

    constructor() {
        this.valueChanged
            .debounceTime(500) // wait 500ms before emitting a value
            .subscribe(value => {
              this.echo = value;
            });
        this.echo = 'no data';
    }

    changed(text: string) {
        this.valueChanged.next(text);
    }
}
