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

  const drawPieChart = useCallback(async () => {
    if (chartRef.current && data && chartData) {
      const ctx = chartRef.current.getContext('2d');
      ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

      let startAngle = 0;
      const total = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
      const dataLength = chartData.labels.length;

      for (let i = 0; i < dataLength; i++) {
        const sliceAngle = (2 * Math.PI * chartData.datasets[0].data[i]) / total;

        ctx.fillStyle = chartData.datasets[0].backgroundColor[i];
        ctx.strokeStyle = 'orange'; // Set the stroke color
        ctx.lineWidth = 0.6; // Set the stroke width

        ctx.beginPath();
        ctx.moveTo(chartRef.current.width / 2, chartRef.current.height / 2);
        ctx.arc(
          chartRef.current.width / 2,
          chartRef.current.height / 2,
          Math.min(chartRef.current.width / 2, chartRef.current.height / 2),
          startAngle,
          startAngle + sliceAngle
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke(); // Draw the stroke

        startAngle += sliceAngle;
      }
    }
  }, [chartData, data]);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 2000); // Fetch data every 2 seconds

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [fetchData]); // Added fetchData to dependency array

  useEffect(() => {
    updateChartData();
  }, [data, updateChartData]); // Updated dependency array

  useEffect(() => {
    if (chartRef.current && chartData) {
      drawPieChart();
    }
  }, [chartData, drawPieChart]); // Updated dependency array

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px' }}>
      <h2>MY ENTITY CHART</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '20px' }}>
        <div style={{ maxWidth: '500px', textAlign: 'left', marginRight: '20px' }}>
          {chartData && chartData.labels && chartData.datasets && (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {chartData.labels.map((label, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px',
                    marginRight: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '10px',
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
                      marginRight: '20px',
                      border: '1px solid orange', // Orange border around the color box
                      padding: '1px', // Optional: Add padding for better appearance
                    }}
                  ></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
          {data && data.length > 0 ? (
            <div>
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <canvas ref={chartRef} style={{ width: '100%', height: '70%' }}></canvas>
              </div>
            </div>
          ) : (
            <p>Add Data to see Entity Chart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
