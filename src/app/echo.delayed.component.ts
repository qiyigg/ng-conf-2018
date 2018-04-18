import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'echo',
  templateUrl: 'echo.delayed.component.html'
})
export class DelayedEchoComponent {

    input: string;
    echo: string;
    constructor() {
        this.echo = 'no data';
    }

    async changed(text: string) {
        console.log('Input has changed to:' + text);
        // Update echo
        this.echo = await this.getEcho();
    }

    getEcho() {
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(this.input);
            }, 1000);
        });
    }
}