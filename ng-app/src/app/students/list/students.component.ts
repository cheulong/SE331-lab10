import {Component} from '@angular/core';
import {Student} from '../student';
import {StudentsDataService} from "../../service/students-data.service";
import {Router} from "@angular/router";
import {StudentsDataServerService} from "../../service/students-data-server.service";


@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  students: Student[];

  constructor(private StudentsDataServerService: StudentsDataServerService, private router: Router ) {
  }

  ngOnInit() {
    this.StudentsDataServerService.getStudentsData()
      .subscribe(students => this.students = students);
  }


  averageGpa() {
    let sum = 0;
    if (Array.isArray(this.students)) {
      for (let student of this.students) {
        sum += student.gpa;
      }
      return sum / this.students.length;
    } else {
      return null;
    }

  }

  upQuantity(student: Student) {
    student.penAmount++;
  }

  downQuantity(student: Student) {
    if (student.penAmount > 0)
      student.penAmount--;
  }

  showDetail(student: Student){
    this.router.navigate(['/detail',student.id]);
  }
}
