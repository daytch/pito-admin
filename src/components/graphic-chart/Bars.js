import React from 'react'
import { Bar } from 'react-chartjs-2'

const Bars = ({ label, data, total_merchant }) => {
    const state = {
        labels: label, //['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        datasets: [
            {
                label: 'Merchants Pito',
                // background: 'linear-gradient(90deg, rgba(148,148,148,1) 0%, rgba(169,169,169,1) 2%, rgba(195,195,195,1) 5%, rgba(217,217,217,1) 11%, rgba(234,234,234,1) 18%, rgba(246,246,246,1) 25%, rgba(253,253,253,1) 32%, rgba(255,255,255,1) 70%, rgba(255,255,255,1) 100%)',
                // borderColor: '#324553',
                // borderWidth: 2,
                // lineTension: 0,
                backgroundColor: 'rgba(224,71,45,0.4)',
                borderColor: 'rgba(224,71,45,1)',
                borderWidth: 2,
                lineTension: 0,
                data: data
            }
        ]
    }
    return (
        <div className="flex flex-col pt-2 md:pt-6 px-4 xxl:px-8 justify-end">
            <div className="flex flex-col text-right">
                <h2 className="font-semibold text-3xl md:text-5xl text-gray-300">MERCHANT</h2>
                <span className="font-semibold text-md md:text-xl text-gray-300">GRAPH</span>
            </div>
            <div className="mt-2">
                <Bar data={state}
                    options={{
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                />
                <div className="mt-4 w-full flex flex-col lg:flex-row">
                    {/* <div className="lg:w-1/2 text-right md:px-5"> */}
                    <div className="lg:w-full text-right md:px-5">
                        <span className="font-semibold text-md md:text-lg text-gray-400">TOTAL PITO USER</span>
                        <h2 className="font-semibold text-3xl md:text-5xl text-red-600">{total_merchant}</h2>
                    </div>
                    {/* <div className="lg:w-1/2 text-justify">
                        <p className="font-light text-xs">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodMERCHANTGRAPH
                                </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Bars;