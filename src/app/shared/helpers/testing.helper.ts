import { ComponentFixture } from '@angular/core/testing';

export const setHtmlInputElement = (
  fixture: ComponentFixture<any>,
  element: string,
  value: string
) => {
  const input: HTMLInputElement =
    fixture.debugElement.nativeElement.querySelector(`[test-id=${element}]`);
  input.value = value;

  input.dispatchEvent(new Event('input'));
};

export const getHtmlElement = (fixture: ComponentFixture<any>, element: string) => {
  return fixture.debugElement.nativeElement.querySelector(
    `[test-id=${element}]`
  );
};
