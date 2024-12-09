import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Car} from '../../models/Car';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  @Input() car!: Car | null;

  bookForm: FormGroup;
  today: string;

  constructor(private fb: FormBuilder, private router: Router) {
    this.today = new Date().toISOString().split('T')[0];
    this.bookForm = this.fb.group({
      startDate: [this.today, [Validators.required]],
      endDate: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { car: Car };
    this.car = state.car;
  }

  ngOnInit(): void {
    this.bookForm.get('startDate')?.valueChanges.subscribe((startDate) => {
      const endDateControl = this.bookForm.get('endDate');
      if (endDateControl?.value && new Date(startDate) > new Date(endDateControl.value)) {
        endDateControl.setValue('');
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid && this.car) {
      const { name, email, startDate, endDate } = this.bookForm.value;

      Swal.fire({
        title: 'Booking Confirmed!',
        html: `
          <div>
            <h4>${this.car.brand} ${this.car.model} (${this.car.year})</h4>
            <img src="${this.car.img}" alt="${this.car.brand}" style="width: 100%; max-width: 300px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Color:</strong> ${this.car.color}</p>
            <p><strong>Mileage:</strong> ${this.car.mileage} km</p>
            <p><strong>Fuel Type:</strong> ${this.car.fuelType}</p>
            <p><strong>Price per Day:</strong> $${this.car.price}</p>
            <hr>
            <p><strong>Booked By:</strong> ${name} (${email})</p>
            <p><strong>From:</strong> ${startDate}</p>
            <p><strong>To:</strong> ${endDate}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/home']);
      });
    } else {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
