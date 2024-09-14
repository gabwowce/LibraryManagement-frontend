import React, { useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useDataContext } from '../../context/DataContext';

function MyLineChart() {
  const { loanData } = useDataContext();
  console.log('Loan data:', loanData);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [isOpen, setIsOpen] = useState(false);

  const filteredData = loanData.filter(item => item.year === selectedYear);

  const handleYearChange = (year) => {
    console.log('Dropdown toggled:', isOpen); 
    setSelectedYear(year);
    setIsOpen(false);
  };

  // Function to format month names
  const formatMonth = (month) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[month - 1] || month;
  };

  return (
    <div className="line-chart-container"> 
      <h2 className='line-chart-title'>Loan Details</h2>
      <div className="custom-dropdown">
        <div 
          className={`custom-dropdown-selected ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedYear}
        </div>
        {isOpen && (
          <div className="custom-dropdown-options">
            <div 
              className="custom-dropdown-option" 
              onClick={() => handleYearChange(2023)}
            >
              2023
            </div>
            <div 
              className="custom-dropdown-option" 
              onClick={() => handleYearChange(2024)}
            >
              2024
            </div>
          </div>
        )}
      </div>
      <div className='line-chart'>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" // Ensure this matches the field name in your data
              tickFormatter={formatMonth} // Format x-axis labels
              tick={{ fontSize: 14 }} // Increase font size of the x-axis labels (months)
            />
            <YAxis />
            <Tooltip 
              contentStyle={{ fontSize: '16px' }} // Increase font size of the tooltip content
              labelFormatter={formatMonth} // Format tooltip label (month abbreviation)
              itemStyle={{ fontSize: '14px' }} // Increase font size of the tooltip items
            />
            <Legend />
            <Line type="monotone" dataKey="loans" stroke="#4880FF" strokeWidth={3} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MyLineChart;
