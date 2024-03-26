import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any;
  imagebyte: string = "";
  totalPages: any;
  currentPage = 0;
  pageSize = 5;
  totalElements: any;
  filteredEmployees: any[] = [];
  searchTerm: string = "";
  totalRecords: number = 0;
  sortDirection: string = 'asc';
  sortColumn: string = 'name';


  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    // this.loadEmployees();
    this.getDataWithPagination();

  }

  searchEmployee(data: any): void {
    // console.log(data);
    setTimeout(() => {

      if (data != "") {
        this.employeeService.searchEmployees(data).subscribe({
          next: (data: any) => {
            if (data) {
              this.employees = data.content;
              console.log(this.employees.length);

              this.totalPages = data.totalPages;
              this.totalElements = data.totalElements;
              this.page = data.pageable.pageNumber;
              this.size = data.pageable.pageSize;
            }
          }, error: (err: any) => {
            alert(err.error.message);
          }
        })
      } else {
        this.ngOnInit();
      }

    }, 500);

    // if (this.searchTerm == ""){
    // this.employeeService.searchEmployees(this.searchTerm).subscribe((response: any) => {
    //   this.employees = response.content;
    // },
    //   (error: any) => {
    //     console.error('Error searching for employee ', error);
    //   }
    // );
  }

  // searchEmployee(): void {
  //   this.employeeService.searchEmployees(this.searchTerm).subscribe(
  //     (response: any) => {
  //       this.employees = response.content;
  //       this.totalRecords = response.totalElements;
  //       this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  //       this.page = 0; // Reset page to the first page
  //       this.getDataWithPagination();
  //     },
  //     (error: any) => {
  //       console.error('Error searching for employee ', error);
  //     }
  //   );
  // }


  loadEmployees(): void {
    this.employeeService.getEmployeesList().subscribe(
      (response: any) => {
        this.employees = response.content;
      },
      (error: any) => {
        console.error('Error while loading employees:', error);
      }
    );
  }

  setImagedata(data: string) {
    this.imagebyte = data;
  }



  // getEmployees() {
  //   this.employeeService.getPaginatedEmployees(this.currentPage, this.pageSize).subscribe(data => {
  //     this.employees = data.data;
  //     this.totalPages = data.totalPages;
  //   });
  // }
  page: number = 0;
  size: number = 5;
  getDataWithPagination() {
    this.employeeService.getdataWithPagination(this.page, this.size).subscribe({
      next: (data: any) => {
        if (data) {
          this.employees = data.content;
          console.log(this.employees);

          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
          this.page = data.pageable.pageNumber;
          this.size = data.pageable.pageSize;
          // this.adjust = data.pageable.pageSize; 
          // rit: any;

        }
      }, error: (err: any) => {
        alert(err.error.message);

      }
    })
  }

  onPageChange(page: number | string, event?: Event): void {
    if (event) {
      event.preventDefault(); // Prevent the default behavior of the anchor element
    }

    if (page === 'Previous') {
      this.page = Math.max(0, this.page - 1); // Ensure page doesn't go below 0
    } else if (page === 'Next') {
      if (this.page < this.totalPages - 1) {
        this.page++; // Increment the page only if not on the last page
      }
    } else {
      this.page = +page - 1; // Convert to number and adjust for zero-based index
    }

    console.log('Current Page:', this.page); // Log current page for debugging
    this.getDataWithPagination();
  }

  // Inside your component
  sortData(column: string): void {
    if (this.sortColumn === column) {
      // If same column clicked, toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If different column clicked, set new column and default direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Implement your custom sorting logic here using this.sortColumn and this.sortDirection
    // You may want to sort your data array accordingly
  }




  pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }



  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    const isConfirmed = window.confirm("Do you really want to delete this employee?");

    if (isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe((data: any) => {
        alert(data.message);
        console.log(data);
        this.getDataWithPagination();
      });
    } else {
      // Handle the case where the user cancels the deletion
      console.log("Deletion cancelled by the user.");
    }
  }
  //Straight the main wall and the part of the main series and also want to see more around and the main concern is that the strike against the main stream and the main part
  //Forward and the amina  

}