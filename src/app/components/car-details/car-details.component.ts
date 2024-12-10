import {Component, Input, OnInit} from '@angular/core';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/Car';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  @Input() car!: Car | null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private carService: CarService,
              protected authService : AuthService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.get(+id).subscribe({
        next: (car) => {
          this.car = car;
        },
        error: (err) => {
          console.error('Error fetching car details:', err);
          this.car = null;
        },
      });
    } else {
      this.car = null;
    }
  }

  onBookNow(id : number): void {
    if (this.car) {
      this.router.navigate(['/book', id], { state: { car: this.car } });
    } else {
      console.error('Car details are not available for booking.');
    }
  }
}
