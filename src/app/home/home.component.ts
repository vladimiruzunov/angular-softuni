import {Component, OnInit} from '@angular/core';
import {CarComponent} from '../car/car.component';
import {Router, RouterLink} from '@angular/router';
import {Car} from '../model/Car';
import {CarService} from '../services/car.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CarComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  featuredCars: Car[] = [];
  testimonials = [
    {
      message: 'This car rental service made my trip unforgettable! Highly recommend.',
      name: 'John Doe'
    },
    {
      message: 'Amazing experience. The car was in perfect condition and the service was top-notch.',
      name: 'Jane Smith'
    },
    {
      message: 'I will definitely use this service again. Excellent customer support.',
      name: 'Emily Johnson'
    }
  ];

  constructor(private carService: CarService, private router: Router) {
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe((items) => {
      this.featuredCars = items;
    });
  }

  scrollToCars(): void {
    const carSection = document.querySelector('.featured-cars');
    if (carSection) {
      carSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  rentCar(car: Car): void {
    this.router.navigate(['/car-details', car.id]);
  }

}
