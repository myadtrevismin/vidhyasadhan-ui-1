import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/_models/dashboard';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  incomes: Dashboard[] = [
    { id: 0, icon: 'leaderboard', text: 'Total Sales', subtext : 'Events', value : '0', type: '', color: '#345398' },
    { id: 1, icon: 'work', text: 'Total Income', subtext : 'Pending tasks', value : '0', type: '', color: '#ddd374' },
    { id: 2, icon: 'business_center', text: 'Total Revenue', subtext : 'Total Revenue', value : '0', type: '', color: '#e85710' },
    { id: 3, icon: 'attach_money', text: 'Profits', subtext : 'Reward points', value : '0%', type: '', color: '#57c44e' }
  ];

  schedule = {
    title: 'Scheduled Classes',
    type: 'AreaChart',
    data: [
      ['Monday', 20, 4],
      ['Tuesday', 10, 6],
      ['Wednesday', 20, 10],
      ['Thursday', 10, 5],
      ['Friday', 20, 10],
      ['Saturday', 10, 10],
      ['Sunday', 20, 10]
   ],
   columnNames : ['Day', 'Online', 'Offline'],
   width: '550px',
   height: '400px',
  };

  users = {
    title: 'Active Users',
    type: 'PieChart',
    data: [
      ['Active', 200],
      ['InActive', 20]
   ],
   columnNames : ['Users', 'Percentage'],
   options : {
    slices: {
       1: {offset: 0.2},
       3: {offset: 0.3}
    },
 },
   width: '550px',
   height: '400px',
  };

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.adminservice.getadminData().subscribe(
      x => {
        this.mapdashboard(x);
      }
    );
  }

  mapdashboard(data){
    this.incomes.find(x => x.id === 0).value = data.classesOrDemos.length;
    this.incomes.find(x => x.id === 1).value = data.newRequests.length;
    this.incomes.find(x => x.id === 2).value = data.totalRevenue.length;
    this.incomes.find(x => x.id === 3).value = data.classesOrDemos.length;
  }

}
