import { async, TestBed, fakeAsync, tick, ComponentFixture} from "@angular/core/testing";
import { DebouncedEchoComponent } from './echo.debounced.component';
import { Component }   from '@angular/core';
import { FormsModule } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

describe("testDebouncedEchoServer", () => {
  let fixture: ComponentFixture<DebouncedEchoComponent>;
  let input : Element;
  let echo : Element;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebouncedEchoComponent],
      imports: [
        FormsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DebouncedEchoComponent);
    fixture.detectChanges();
    const elem = fixture.nativeElement;
    input = elem.querySelector('input');
    echo = elem.querySelector('span');
  }));

  it("should echo the input value only if advancing at least the debounce time", fakeAsync(() => {

    // Correct initial state
    expect(echo.textContent).toBe('no data');

    sendKeys(input, 'ng-conf ');
    tick(499);
    fixture.detectChanges();
    // No change within the debounce time
    expect(echo.textContent).toBe('no data');

    // Reset debounce time after entering new data
    sendKeys(input, 'is ');
    tick(100);
    fixture.detectChanges();
    // No change within the debounce time
    expect(echo.textContent).toBe('no data');

    sendKeys(input, 'great');
    tick(500);
    fixture.detectChanges();
    // Echo result
    expect(echo.textContent).toBe('ng-conf is great');

    sendKeys(input, '!!!');
    tick(1000);
    fixture.detectChanges();
    // Echo result
    expect(echo.textContent).toBe('ng-conf is great!!!');
  }));

});

function sendKeys(element: Element, keys: string) {
  const e = element as HTMLInputElement;
  for (const key of keys) {
    const eventParams = {key, char: key, keyCode: key.charCodeAt(0)};
    e.dispatchEvent(new KeyboardEvent('keydown', eventParams));
    e.dispatchEvent(new KeyboardEvent('keypress', eventParams));
    e.value += key;
    e.dispatchEvent(new KeyboardEvent('keyup', eventParams));
    e.dispatchEvent(new Event('input'));
  }
}