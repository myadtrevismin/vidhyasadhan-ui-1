import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomCalendarFormat extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${event.start} - ${event.end}</b> ${event.title}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${event.start} - ${event.end}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${event.start} - ${event.end}</b> ${event.title}`;
  }
}
