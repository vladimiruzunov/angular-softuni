import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constant} from './constant';
import {Car, CreateCar} from '../model/Car';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  carUrl = Constant.URL_BASE + '/cars';


  constructor(private http: HttpClient) {
  }


  get(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.carUrl}/${id}`);
  }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carUrl}`);
  }

  create(car: CreateCar): Observable<Car> {
    return this.http.post<Car>(`${this.carUrl}`, car);
  }

  update(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.carUrl}/${car.id}`, car);
  }

  delete(id: number) {
    return this.http.delete(`${this.carUrl}/${id}`);
  }
}
