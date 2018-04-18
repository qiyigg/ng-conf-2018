import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { DelayedEchoComponent } from './echo.delayed.component';
import { Component }   from '@angular/core';
import { FormsModule } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

describe("testDelayedEchoServer", () => {
  let fixture: ComponentFixture<DelayedEchoComponent>;
  let input : Element;
  let echo : Element;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelayedEchoComponent],
      imports: [
        FormsModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DelayedEchoComponent);
    fixture.detectChanges();
    const elem = fixture.nativeElement;
    input = elem.querySelector('input');
    echo = elem.querySelector('span');
  });

  describe("should echo the input value:", (() => {

    it("looks good?", () => {
      const input_text = 'ng-conf is great'; 
      sendKeys(input, input_text);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(echo.textContent).toBe(input_text);
      });
    });

    it("false negative", () => {
      const input_text = 'ng-conf is great'; 
      sendKeys(input, input_text);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(echo.textContent).toBe('wrong content');
      });
    });

    it("jasmine done", (done) => {
      const input_text = 'ng-conf is great'; 
      sendKeys(input, input_text);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(echo.textContent).toBe(input_text);
        done();
      });
    });

    it("async function", async(() => {
      const input_text = 'ng-conf is great'; 
      sendKeys(input, input_text);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(echo.textContent).toBe(input_text);
      });
    }));

    it("long promise chain", async(() => {
      sendKeys(input, 'ng-conf');
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(echo.textContent).toBe('ng-conf');
        sendKeys(input, ' is');
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(echo.textContent).toBe('ng-conf is');
          sendKeys(input, ' great');
          fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(echo.textContent).toBe('ng-conf is great');
          });
        });
      });
    }));

    it("async await", async () => {
      sendKeys(input, 'ng-conf');
      await fixture.whenStable();
      fixture.detectChanges();
      expect(echo.textContent).toBe('ng-conf');
      sendKeys(input, ' is');
      await fixture.whenStable();
      fixture.detectChanges();
      expect(echo.textContent).toBe('ng-conf is');
      sendKeys(input, ' great');
      await fixture.whenStable();
      fixture.detectChanges();
      expect(echo.textContent).toBe('ng-conf is great');
    });

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