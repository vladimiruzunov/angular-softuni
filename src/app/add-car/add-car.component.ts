import {Component, OnInit} from '@angular/core';
import {CarService} from '../services/car.service';
import {Car} from '../model/Car';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {

  }


}
