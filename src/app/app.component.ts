import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sharp Code Challenge';
  familyPracticeDoctors: Doctor[] = [];
  pediatricDoctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => {
        // the member variables below will hold collections of doctors that are bound to the app.component.html template
        this.familyPracticeDoctors = this.processDoctorArray(doctors, 'FamilyPractice');
        this.pediatricDoctors = this.processDoctorArray(doctors, 'Pediatrics');
      });
  }

  processDoctorArray(doctors, practiceType): Doctor[] {
  //  console.log(doctors); 
    let sortedArray = [];
      for(let key in doctors){
          //console.log(doctors[key].specialty);
          if(doctors[key].specialty == practiceType){
           sortedArray.push(doctors[key]);
          }
      }
    sortedArray.sort( (a,b) => {
      return b.reviewCount - a.reviewCount;
    });

    //console.log(sortedArray);

    // Implement your code here

    return sortedArray;
  }
}
