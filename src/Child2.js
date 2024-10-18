import React, { Component } from 'react';
import "./App.css";
import * as d3 from 'd3';

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {
        const data = this.props.data2; // Assuming props.data contains the tips.csv dataset

        // Calculate average tips by day
        const averageTipsByDay = d3.rollup(
            data,
            v => d3.mean(v, d => d.tip),
            d => d.day
        );

        const margin = { top: 10, right: 10, bottom: 30, left: 40 },
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        const svg = d3.select(".child2_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .select(".g_2")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(Array.from(averageTipsByDay.keys()))
            .range([0, width])
            .padding(0.1);

        svg.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        const y = d3.scaleLinear()
            .domain([0, d3.max(Array.from(averageTipsByDay.values()))])
            .range([height, 0]);

        svg.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'y_axis_g')
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(Array.from(averageTipsByDay.entries()))
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d[0]))
            .attr("y", d => y(d[1]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d[1]))
            .attr("fill", "#69b3a2");

        // Adding labels and title
        svg.selectAll(".x_label").data([0]).join('text').attr("class", 'x_label')
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5 )
            .attr("text-anchor", "middle")
            .text("Day");

        svg.selectAll(".y_label").data([0]).join('text').attr("class", 'y_label')
            .attr("x", -margin.left * 3)
            .attr("y", margin.left - 68)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Average Tip");

        svg.selectAll(".title").data([0]).join('text').attr("class", 'title')
            .attr("x", width / 2)
            .attr("y", margin.top)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Average Tip by Day");

    }

    render() {
        return (
            <svg className="child2_svg">
                <g className="g_2"></g>
            </svg>
        );
    }
}

export default Child2;

