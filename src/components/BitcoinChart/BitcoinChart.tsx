import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBitcoinPrice} from '../../features/bitcoinPrice/bitcoinPriceSlice';
import {RootState} from '../../app/store';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement} from 'chart.js';


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
)

const BitcoinChart: React.FC = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.bitcoinPrice);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            { data: [], label: 'USD', borderColor: 'blue' },
            { data: [], label: 'EUR', borderColor: 'green' },
            { data: [], label: 'GBP', borderColor: 'red' },
        ],
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(fetchBitcoinPrice());
        }, 15000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        if (data.bpi) {
            const time = new Date().toLocaleTimeString();
            setChartData(prevData => ({
                labels: [...prevData.labels, time],
                datasets: [
                    { ...prevData.datasets[0], data: [...prevData.datasets[0].data, data.bpi.USD.rate_float] },
                    { ...prevData.datasets[1], data: [...prevData.datasets[1].data, data.bpi.EUR.rate_float] },
                    { ...prevData.datasets[2], data: [...prevData.datasets[2].data, data.bpi.GBP.rate_float] },
                ],
            }));
        }
    }, [data]);

    return (
        <div>
            <Line data={chartData} options={{
                scales: {
                    x: { title: { text: 'Time', display: true } },
                    y: { title: { text: 'Price', display: true } },
                },
            }} />
        </div>
    );
};

export default BitcoinChart;
