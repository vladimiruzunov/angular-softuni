import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constant} from './constant';
import {Testimonial} from '../models/Testimonial';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  testimonialUrl = Constant.URL_BASE + '/testimonials';

  constructor(private http: HttpClient) {}

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(this.testimonialUrl);
  }
}
