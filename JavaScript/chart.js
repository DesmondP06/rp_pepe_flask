//Demonstrate how to create a line chart 

async function getData(){
    const response = await fetch('/rp_Pepe/data/data.csv')
    //const response = await fetch('../data/data.csv');
    const data = await response.text();
    console.log(data);

    const  water = []; 
    const ethanol = [];
    const I3C1 = [];
    const I3C2 = []; 
    const NAC1 = []; 
    const NAC2 = []; 


    const table = data.split('\n');
    console.log(table);

    table.forEach(row => {
        const columns = row.split(','); //split row on comma

        const waterW = parseFloat(columns[0]); 
        water.push(waterW); 

        const ethanolE = parseFloat(columns[1]);
        ethanol.push(ethanolE);

        const I3C1I = parseFloat(columns[2]);
        I3C1.push(I3C1I);

        const I3C2I = parseFloat(columns[3]);
        I3C2.push(I3C2I); 

        const NAC1N = parseFloat(columns[4]);
        NAC1.push(NAC1N);

        const NAC2N = parseFloat(columns[5]);
        NAC2.push(NAC2N);


    
    });
    
    function calcAverage (array) {
        let sum = array.reduce((acc, val) => acc + val, 0);
        return (sum/array.length);
    }

    const waterAvg = calcAverage(water);
    const ethanolAvg = calcAverage(ethanol);
    const I3C1Avg = calcAverage(I3C1);
    const I3C2Avg = calcAverage(I3C2);
    const NAC1Avg = calcAverage(NAC1);
    const NAC2Avg = calcAverage(NAC2);

    return {waterAvg, ethanolAvg, I3C1Avg, I3C2Avg, NAC1Avg, NAC2Avg}
}
async function createChart () {
    const data = await getData(); //createChart will wait until getData() is finished processing

    //This is straight from chart JS
    
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
        type: 'bar', 
        
        data: { 
            labels: ['Water', 'Ethanol', '5 mg/mL I3C', '10 mg/mL I3C', '25 mg/mL NAC', '50 mg/mL NAC'],    
            datasets: [
                {
                    label: "Area of limited growth (mm)",
                    data: [data.waterAvg, data.ethanolAvg, data.I3C1Avg, data.I3C2Avg, data.NAC1Avg, data.NAC2Avg],
                    fill: false,
                    backgroundColor: 
                    [
                    'rgba(255, 99, 132, 0.2)', 
                    'rgba(0, 99, 132, 0.2)', 
                    'rgba(0, 10, 132, 0.2)', 
                    'rgba(255, 0, 255, 0.2)', 
                    'rgba(10, 200, 132, 0.2)', 
                    'rgba(200, 50, 75, 0.2)'],
                
                    borderColor: 
                    [
                    'rgba(255, 99, 132, 1)', 
                    'rgba(0, 99, 132, 1)', 
                    'rgba(0, 10, 132, 1)', 
                    'rgba(255, 0, 255, 1)', 
                    'rgba(10, 200, 132, 1)', 
                    'rgba(200, 50, 75, 1)' ],

                    borderWidth: 1,
                },

            ]
        }, 
        options: {
            responsive: true, //resize based on screen size
            scales: {         //display options for x and y axes
                x:{
                    title: {
                        display: true,
                        text: 'Treatment',
                        font: { 
                            size: 23
                        },
                    },
                    ticks: {
                        font: {
                            size: 15, // Set the font size for x-axis labels 
                        }}

                },
                y: {
                    title: {
                        display: true,
                        text: 'Diameter of Area of Limited Growth (mm)',
                        font: {
                            size: 23
                        },
                    },
                    ticks: {
                        maxTicksLimit: 5,
                        font: {
                            size: 15,
                        }
                    },
                    min: 0,
                    max: 10,

                }
            },
            plugins: { //Display options
                title: {
                    display: true,
                    text: "Average Area of Limited Bacterial Growth for All Treatments Tested",
                    font:{
                        size: 30
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: false,
                }
            }
        }
    })
};

createChart();

