// import { Component } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, VERSION } from '@angular/core';
import * as d3 from 'd3';
import { DefaultArcObject } from 'd3';
interface PieData {
  label: string;
  value: number;
  color: string;
}
// interface ExpensePieData {
//   label: string;
//   value: number;
//   color: string;
// }

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart();
    // this.ExpensecreateChart();
  }
  // Ep
  @ViewChild('pieChart', { static: true }) private chartContainer!: ElementRef;

  private data: PieData[] = [
    { label: 'Section 1', value: 10, color: '#ff0000' }, // Red
    { label: 'Section 2', value: 20, color: '#00ff00' }, // Green
    { label: 'Section 3', value: 30, color: '#0000ff' }, // Blue
    { label: 'Section 4', value: 40, color: '#ffff00' }  // Yellow
  ];

  
  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 270;
    const height = 270;
    const radius = Math.min(width, height) / 2;
  
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
    const pie = d3.pie<PieData>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(0)
      .outerRadius(radius);
  
    const arcs = svg.selectAll('arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');
  
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color); // Use the color property
  
    // Add labels
    arcs.append('text')
      .attr('transform', (d: d3.PieArcDatum<PieData>) => {
        const [x, y] = arc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        const xText = radius * 1.2 * Math.cos(midAngle);
        const yText = radius * 1.2 * Math.sin(midAngle);
        return `translate(${xText}, ${yText})`;
      })
      .attr('text-anchor', 'middle')
      // .style('fill', 'black')
      // .text(d => d.data.label);
  
    // Add values inside the sections
    arcs.append('text')
      .attr('transform', (d: d3.PieArcDatum<PieData>) => {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => d.data.value);
  }
  /***********Expence vs Deposite chart********* */
  // @ViewChild('ExpensepieChart', { static: true }) private ExpensechartContainer!: ElementRef;

  // private Expensedata: ExpensePieData[] = [
  //   { label: 'Section 1', value: 10, color: '#ff0000' }, // Red
  //   { label: 'Section 2', value: 20, color: '#00ff00' }, // Green
  
  // ];

  
  // private ExpensecreateChart(): void {
  //   const element = this.chartContainer.nativeElement;
  //   const width = 270;
  //   const height = 270;
  //   const radius = Math.min(width, height) / 2;
  
  //   const svg = d3.select(element)
  //     .append('svg')
  //     .attr('width', width)
  //     .attr('height', height)
  //     .append('g')
  //     .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
  //   const pie = d3.pie<ExpensePieData>().value(d => d.value);
  //   const arc = d3.arc<d3.PieArcDatum<ExpensePieData>>()
  //     .innerRadius(0)
  //     .outerRadius(radius);
  
  //   const arcs = svg.selectAll('arc')
  //     .data(pie(this.data))
  //     .enter()
  //     .append('g')
  //     .attr('class', 'arc');
  
  //   arcs.append('path')
  //     .attr('d', arc)
  //     .attr('fill', d => d.data.color); // Use the color property
  
  //   // Add labels
  //   arcs.append('text')
  //     .attr('transform', (d: d3.PieArcDatum<ExpensePieData>) => {
  //       const [x, y] = arc.centroid(d);
  //       const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
  //       const xText = radius * 1.2 * Math.cos(midAngle);
  //       const yText = radius * 1.2 * Math.sin(midAngle);
  //       return `translate(${xText}, ${yText})`;
  //     })
  //     .attr('text-anchor', 'middle')
  //     // .style('fill', 'black')
  //     // .text(d => d.data.label);
  
  //   // Add values inside the sections
  //   arcs.append('text')
  //     .attr('transform', (d: d3.PieArcDatum<ExpensePieData>) => {
  //       const [x, y] = arc.centroid(d);
  //       return `translate(${x}, ${y})`;
  //     })
  //     .attr('text-anchor', 'middle')
  //     .style('fill', 'white')
  //     .text(d => d.data.value);
  // }
 
  
}