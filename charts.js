document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('occupancyChart');
    if (ctx) {

        const context = ctx.getContext('2d');

        // Create gradient for Occupancy line
        const gradientBlue = context.createLinearGradient(0, 0, 0, 300);
        gradientBlue.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
        gradientBlue.addColorStop(1, 'rgba(59, 130, 246, 0.02)');

        // Create gradient for Check-ins bar
        const gradientGreen = context.createLinearGradient(0, 0, 0, 300);
        gradientGreen.addColorStop(0, 'rgba(16, 185, 129, 0.9)');
        gradientGreen.addColorStop(1, 'rgba(16, 185, 129, 0.4)');

        // Create gradient for Check-outs bar
        const gradientOrange = context.createLinearGradient(0, 0, 0, 300);
        gradientOrange.addColorStop(0, 'rgba(245, 158, 11, 0.9)');
        gradientOrange.addColorStop(1, 'rgba(245, 158, 11, 0.4)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Check-ins',
                        data: [8, 12, 10, 15, 18, 22, 16],
                        backgroundColor: gradientGreen,
                        borderColor: '#10b981',
                        borderWidth: 1,
                        borderRadius: 6,
                        barPercentage: 0.5,
                        categoryPercentage: 0.6,
                        order: 2
                    },
                    {
                        label: 'Check-outs',
                        data: [5, 9, 7, 11, 14, 12, 19],
                        backgroundColor: gradientOrange,
                        borderColor: '#f59e0b',
                        borderWidth: 1,
                        borderRadius: 6,
                        barPercentage: 0.5,
                        categoryPercentage: 0.6,
                        order: 3
                    },
                    {
                        label: 'Occupancy Rate (%)',
                        data: [65, 78, 72, 85, 92, 98, 90],
                        type: 'line',
                        borderColor: '#3b82f6',
                        backgroundColor: gradientBlue,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#3b82f6',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        yAxisID: 'y1',
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { family: "'Inter', sans-serif", size: 13 },
                        bodyFont: { family: "'Inter', sans-serif", size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Guests',
                            font: { family: "'Inter', sans-serif", size: 12, weight: '500' }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: "'Inter', sans-serif", size: 11 }
                        }
                    },
                    y1: {
                        beginAtZero: true,
                        max: 100,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Occupancy %',
                            font: { family: "'Inter', sans-serif", size: 12, weight: '500' }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            },
                            font: { family: "'Inter', sans-serif", size: 11 }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: "'Inter', sans-serif", size: 12, weight: '500' }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Room Status Doughnut Chart
    const statusCtx = document.getElementById('roomStatusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Available', 'Occupied', 'Maintenance'],
                datasets: [{
                    data: [45, 68, 7],
                    backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { family: "'Inter', sans-serif", size: 13 },
                        bodyFont: { family: "'Inter', sans-serif", size: 12 },
                        padding: 12,
                        cornerRadius: 8
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
});
