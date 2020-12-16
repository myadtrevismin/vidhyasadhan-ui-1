import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StudentmateriallistDataSource, StudentmateriallistItem } from './studentmateriallist-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { StudymaterialService } from 'src/app/_services/studymaterial.service';

@Component({
  selector: 'app-studentmateriallist',
  templateUrl: './studentmateriallist.component.html',
  styleUrls: ['./studentmateriallist.component.css']
})
export class StudentmateriallistComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StudentmateriallistItem>;
  dataSource: StudentmateriallistDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'subject', 'grade', 'topic', 'files'];
  href;

  slides = [
    // { id: 1, video: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=', title: 'video 1' },
    // { id: 2, video: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=', title: 'video 2'},
    // { id: 3, video: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=', title: 'video 3'},
    // { id: 4, video: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=', title: 'video 4'},
    // { id: 5, video: 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=', title: 'video 5'}
  ];

  constructor(private route: Router, private studyMaterial: StudymaterialService){
    this.href = this.route.url;
  }

  ngOnInit() {
    this.dataSource = new StudentmateriallistDataSource();
    this.studyMaterial.getMaterials().subscribe(x => {
      this.dataSource.data = x;
      x.forEach(a => {
       a.files?.forEach(element => {
          this.slides.push({video: element.filePath, title: element.filePath});
        });
      });

      this.slides.forEach(x => x.video += window.location.origin);

    } );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  downloadFile(files){

  }
}
