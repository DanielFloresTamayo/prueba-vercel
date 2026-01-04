import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeService } from './services/home.service';
import { FeaturedTutor } from '../models/featured-tutor.dto';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  featuredTutors: FeaturedTutor[] = [];
  runAnim = false;

  constructor(private homeService: HomeService) { }

ngOnInit(): void {
  
  setTimeout(() => {
    this.runAnim = true;
  }, 60); 
  this.homeService.getFeaturedTutors().subscribe(r => this.featuredTutors = r);
}


  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
