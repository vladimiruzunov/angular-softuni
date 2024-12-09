import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Car} from '../model/Car';
import {CarService} from '../services/car.service';
import {CommonModule} from '@angular/common';
import {FuelType} from '../model/FuelType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  carBrands: string[] = [];
  carModels: string[] = [];
  selectedBrand: string = '';
  fuelTypes = Object.values(FuelType);

  constructor(private fb: FormBuilder, private carService: CarService, private router: Router) {
    this.searchForm = this.fb.group({
      brand: [''],
      model: [''],
      year: [''],
      mileage: [''],
      fuelType: ['']
    });
    this.loadCars();
  }

  ngOnInit(): void {
    this.carService.getAll().subscribe((cars: Car[]) => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  extractBrandsAndModels(): void {
    this.carBrands = [...new Set(this.cars.map(car => car.brand))];

    this.onBrandChange(this.selectedBrand);
  }

  loadCars(): void {
    this.carService.getAll().subscribe((cars) => {
      this.cars = cars;
      this.extractBrandsAndModels();  // Extract brands and models from the cars list
    });
  }

  onBrandChange(brand: string): void {
    this.selectedBrand = brand;

    if (brand) {
      const modelsForBrand = this.cars
        .filter(car => car.brand === brand)
        .map(car => car.model);

      this.carModels = [...new Set(modelsForBrand)];
    } else {
      this.carModels = [];
    }
  }


  onSearch(): void {
    const { brand, model, year, mileage, fuelType } = this.searchForm.value;
    this.filteredCars = this.cars.filter(car =>
      (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
      (!model || car.model.toLowerCase().includes(model.toLowerCase())) &&
      (!year || car.year === +year) &&
      (!mileage || car.mileage <= +mileage) &&
      (!fuelType || car.fuelType === fuelType)
    );
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.filteredCars = [...this.cars];
  }

  viewDetails(id : number) {
    this.router.navigate(['/car-details', id]);
  }
}
