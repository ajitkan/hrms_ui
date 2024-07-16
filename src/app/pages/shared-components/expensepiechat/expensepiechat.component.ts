import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DefaultArcObject } from 'd3';
interface PieData {
  label: string;
  value: number;
  color: string;
}


@Component({
  selector: 'app-expense',
  templateUrl: './expensepiechat.component.html',
  styleUrls: ['./expensepiechat.component.css']
})
export class ExpensepiechatComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }
  // Ep
  @ViewChild('pieChart', { static: true }) private chartContainer!: ElementRef;

  private data: PieData[] = [
    { label: 'Section 1', value: 10, color: '#c3b7c5' }, // Red
    { label: 'Section 2', value: 20, color: '#06c0e0' }, // Green
   
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

 
  
}
