import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'airbnb-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

    @Input() price: number;
    daterange: any = {};

    constructor() { }

    options: any = {
      locale: { format: 'YYYY-MM-DD'},
      alwaysShowCalendars: false,
        opens: 'left'
    };

    ngOnInit() {
    }

    selectedDate(value: any, datepicker?: any) {
      datepicker.start = value.start;
      datepicker.end = value.end;

      this.daterange.start = value.start;
      this.daterange.end = value.end;
      this.daterange.label = value.label;

    }

}
