import { async, TestBed, ComponentFixture, getTestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { XHREchoComponent } from './echo.xhr.component';
import { Component }   from '@angular/core';
import { FormsModule } from '@angular/forms';
import "rxjs/add/operator/debounceTime";

describe("testXHREchoServer", () => {
  let fixture: ComponentFixture<XHREchoComponent>;
  let button : HTMLButtonElement;
  let echo : Element;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XHREchoComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(XHREchoComponent);
    fixture.detectChanges();
    const injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    const elem = fixture.nativeElement;
    button = elem.querySelector('button');
    echo = elem.querySelector('span');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should make an XHR to fetch data and update echo", () => {
    const input_text = 'ng-conf is great'; 
    button.click();
    const req = httpMock.expectOne('./assets/echo.json');
    const mockResp = {"data":"ng conf is great"};
    req.flush(mockResp);
    fixture.detectChanges();
    expect(echo.textContent).toBe('ng conf is great');
  });

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