import React, { useEffect, useRef, useState, useCallback } from 'react';

const PieChartComponent = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const userId = storedUserObject.name;
  
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://chartonlineapi.azurewebsites.net/api/Common/UserId?userid=${userId}`);

      if (!response.ok) {
        console.error('Response error:', response.statusText);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setData(result);
        console.log('Fetched data:', result);
      } else {
        console.error('Invalid data format:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, [userId]);

  const updateChartData = useCallback(() => {
    if (data) {
      const uniqueEntities = [...new Set(data.map(item => item.entityName))];
      const colors = getRandomColors(uniqueEntities.length);

      const entityCounts = uniqueEntities.map(entity => {
        const featuresCount = data.filter(item => item.entityName === entity).length;
        return featuresCount;
      });

      setChartData({
        labels: uniqueEntities,
        datasets: [{
          data: entityCounts,
          backgroundColor: colors,
          borderWidth: 0.5,
          borderColor: 'orange',
        }],
      });
    }
  }, [data]);

  const getRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`rgba(255, 255, 0, ${(i + 1) / (count + 1)})`);
    }
    return colors;
  };

  useEffect(() => {
    const loadChartJsScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        fetchData();
      };
    };

    if (typeof window.Chart === 'undefined') {
      loadChartJsScript();
    } else {
      fetchData();
    }
  }, [userId, fetchData]);

  useEffect(() => {
    updateChartData();
  }, [data, updateChartData]);

  useEffect(() => {
    if (chartRef.current && window.Chart && chartData) {
      if (window.myPieChart) {
        window.myPieChart.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      window.myPieChart = new window.Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Pie Chart',
            position: 'right',
          },
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
        },
      });

      const chartContainer = chartRef.current.parentElement;
      chartRef.current.width = chartContainer.offsetWidth;
      chartRef.current.height = chartContainer.offsetHeight;

      window.myPieChart.resize();
    }
  }, [chartData, chartRef]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
      <h2>My Entity Chart</h2>
      <div style={{ position: 'relative', maxWidth: '400px', width: '70%', textAlign: 'center' }}>
        {data && data.length > 0 ? (
          <div>
            
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        ) : (
          <p>Add Data to see Entity Chart</p>
        )}
      </div>
    </div>
  );
};

export default PieChartComponent;