import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface BarData {
  label: string;
  value: number;
  color: string;
}


@Component({
  selector: 'app-paymentbar',
  templateUrl: './paymentbarchart.component.html',
  styleUrls: ['./paymentbarchart.component.css']
})
export class PaymentbarchartComponent implements OnInit {
  @ViewChild('barChart', { static: true }) private chartContainer!: ElementRef;

  private data: BarData[] = [
    { label: 'Jan-2024', value: 400, color: '#D19699' }, // Red
    { label: 'Feb-2024', value: 200, color: '#D19699' }, // Green
    { label: 'Mar-2024', value: 1000, color: '#D19699' }, // Blue
    { label: 'Apr-2024', value: 2000, color: '#D19699' }  // Yellow
  ];

  constructor() {}

  ngOnInit(): void {
    this.createChart();
  }

  private createChart(): void {
    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
      .domain(this.data.map(d => d.label))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) || 0])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => d.color);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    // Add labels
    svg.selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.label)! + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.value);
  }
}