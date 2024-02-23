import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  // getSafeImage() {
  //   throw new Error('Method not implemented.');
  // }

  id: number = 0;
  employee: Employee = new Employee();
  profileImage: File | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEmployeeDetails();
    });
  }

  // loadEmployeeDetails() {
  //   this.employeeService.getEmployeeById(this.id).subscribe((response) => {
  //     this.employee = response;

  //     // Set the profileImage to the current employee's image
  //     this.profileImage = null; // Reset it to null initially

  //     // Assuming your Employee model has a property like 'empImage' for the image
  //     if (this.employee.empImage) {
  //       // Convert the image data to a Blob and create a File
  //       // const blob = new Blob([employee.empImage]);
  //       this.profileImage = new File([blob], 'profile-image');
  //     }
  //   }, (error) => {
  //     console.log('Error while loading employee details', error);
  //   });
  // }


  // loadEmployeeDetails() {
  //   this.employeeService.getEmployeeById(this.id).subscribe(
  //     (response) => {
  //       this.employee = response;
  //     },
  //     (error) => {
  //       console.log('Error while loading employee details', error);
  //     }
  //   );
  // }

  loadEmployeeDetails() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      (response) => {
        this.employee = response;
        // Check if createdDate is null, and set a default value if needed
        this.employee.createdDate = this.employee.createdDate || new Date(); // Provide your default date if necessary
      },
      (error) => {
        console.log('Error while loading employee details', error);
      }
    );
  }


  // onSubmit() {
  //   const formData = new FormData();

  //   formData.append('name', this.employee.name.toString());
  //   formData.append('designation', this.employee.designation.toString());
  //   formData.append('salary', this.employee.salary.toString());

  //   if (this.profileImage) {
  //     formData.append('file', this.profileImage, this.profileImage.name);
  //   }

  //   formData.append('data', JSON.stringify(this.employee));

  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type', 'multipart/form-data');

  //   this.http.put<any>(`http://localhost:1018/api/employees/${this.id}`, formData, { headers }).subscribe(
  //     (response) => {
  //       console.log('Employee updated successfully:', response);
  //       this.goToEmployeeList();
  //     },
  //     (error) => {
  //       console.log('Error in updating Employee: ', error);
  //     }
  //   );
  // }

  onSubmit() {
    const formData = new FormData();
  
    formData.append('name', this.employee.name.toString());
    formData.append('designation', this.employee.designation.toString());
    formData.append('salary', this.employee.salary.toString());
  
    // Check if createdDate is not null before formatting
    if (this.employee.createdDate) {
      // Format the date before appending it to FormData
      const formattedDate = this.datePipe.transform(this.employee.createdDate, 'yyyy-MM-dd');
      formData.append('createdDate',  formattedDate!);
      console.log(formattedDate!);
      
    }
  
    if (this.profileImage) {
      formData.append('file', this.profileImage, this.profileImage.name);
    }
  
    formData.append('data', JSON.stringify(this.employee));

    const headers = new HttpHeaders();
    // console.log(createdDate);
    

  
    // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  
    this.http.put<any>(`http://localhost:1018/api/employees/${this.id}`, formData, { headers }).subscribe(
      (response) => {
        console.log('Employee updated successfully:', response);
        alert(JSON.stringify(response));
        this.goToEmployeeList();
      },
      (error) => {
        console.log('Error in updating Employee: ', error);
      }
    );
  }
  

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.profileImage = fileList[0];
    }
  }

  // getSafeImage(): SafeUrl {
  //   if (this.employee.empImage && Array.isArray(this.employee.empImage)) {
  //     return '';

  //   } else if(this.employee.empImage instanceof Blob){
  //     const imageBlob = this.employee.empImage;
  //     const imageUrl = URL.createObjectURL(imageBlob);  
  //     return this.sanitizer.bypassSecurityTrustUrl(imageUrl);

  //   } else {
  //     return '';
  //   }
  // }
}
