import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'src/app/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from 'src/app/services/product.service';

const PRODUCT_DATA: IProduct[] = []

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'descripcion', 'tipo', 'cantidad']; 
  dataSource = new MatTableDataSource(PRODUCT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private productService: ProductService) {
    this.dataSource = new MatTableDataSource(PRODUCT_DATA)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.productService.getProduct().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  applyFilter(event: Event, filterField: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterField === 'name') {
      this.dataSource.filterPredicate = function (record, filter) {
        return record.name.toLocaleLowerCase() == filter.toLocaleLowerCase();
      }
    } else if (filterField === 'type') {
      this.dataSource.filterPredicate = function (record, filter) {
        return record.tipo.toLocaleLowerCase() == filter.toLocaleLowerCase();
    }
  }
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

