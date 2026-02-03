import React, { useMemo } from 'react';
import './SalesStatistics.scss';

const SalesStatistics: React.FC = () => {
    const weeklySales = [
        { day: 'Пн', revenue: 12400, orders: 34 },
        { day: 'Вт', revenue: 17850, orders: 45 },
        { day: 'Ср', revenue: 15230, orders: 41 },
        { day: 'Чт', revenue: 19670, orders: 52 },
        { day: 'Пт', revenue: 23890, orders: 63 },
        { day: 'Сб', revenue: 28110, orders: 71 },
        { day: 'Вс', revenue: 21440, orders: 58 }
    ];

    const categoryBreakdown = [
        { name: 'Пицца', share: 46 },
        { name: 'Закуски', share: 18 },
        { name: 'Завтраки', share: 14 },
        { name: 'Десерты', share: 12 },
        { name: 'Напитки', share: 10 }
    ];

    const topItems = [
        { name: 'Пепперони фреш', sold: 126, revenue: 30240 },
        { name: 'Бургер-пицца', sold: 98, revenue: 26460 },
        { name: 'Острый Додстер', sold: 82, revenue: 18760 },
        { name: 'Чизкейк Нью-Йорк', sold: 74, revenue: 11740 }
    ];

    const totalRevenue = weeklySales.reduce((acc, item) => acc + item.revenue, 0);
    const totalOrders = weeklySales.reduce((acc, item) => acc + item.orders, 0);
    const averageCheck = totalRevenue / totalOrders;
    const maxRevenue = Math.max(...weeklySales.map((item) => item.revenue));

    const linePath = useMemo(() => {
        const maxOrders = Math.max(...weeklySales.map((item) => item.orders));
        const points = weeklySales.map((item, index) => {
            const x = (index / (weeklySales.length - 1)) * 100;
            const y = 100 - (item.orders / maxOrders) * 100;
            return `${x},${y}`;
        });
        return `M ${points.join(' L ')}`;
    }, [weeklySales]);

    return (
        <div className='sales_statistics'>
            <div className="sales_statistics__header">
                <div>
                    <h1>Статистика продаж</h1>
                    <p>Еженедельный обзор по выручке, заказам и популярным позициям.</p>
                </div>
                <div className="sales_statistics__period">
                    <span>Период:</span>
                    <strong>последние 7 дней</strong>
                </div>
            </div>

            <div className="sales_statistics__cards">
                <div className="sales_statistics__card">
                    <span>Выручка</span>
                    <h2>{totalRevenue.toLocaleString('ru-RU')} ₽</h2>
                    <p>+12% к прошлой неделе</p>
                </div>
                <div className="sales_statistics__card">
                    <span>Заказы</span>
                    <h2>{totalOrders}</h2>
                    <p>Средняя нагрузка 52 заказа/день</p>
                </div>
                <div className="sales_statistics__card">
                    <span>Средний чек</span>
                    <h2>{Math.round(averageCheck).toLocaleString('ru-RU')} ₽</h2>
                    <p>Пицца + напиток в 43% заказов</p>
                </div>
                <div className="sales_statistics__card">
                    <span>Повторные покупки</span>
                    <h2>38%</h2>
                    <p>Рост на 4% благодаря акциям</p>
                </div>
            </div>

            <div className="sales_statistics__charts">
                <div className="sales_statistics__chart">
                    <h3>Выручка по дням</h3>
                    <div className="sales_statistics__bars">
                        {weeklySales.map((item) => (
                            <div className="sales_statistics__bar" key={item.day}>
                                <div
                                    className="sales_statistics__bar-fill"
                                    style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                                >
                                    <span>{item.revenue.toLocaleString('ru-RU')} ₽</span>
                                </div>
                                <span className="sales_statistics__bar-label">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sales_statistics__chart">
                    <h3>Динамика заказов</h3>
                    <div className="sales_statistics__line-chart">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d={linePath} className="sales_statistics__line" />
                        </svg>
                        <div className="sales_statistics__line-labels">
                            {weeklySales.map((item) => (
                                <div key={item.day}>
                                    <strong>{item.orders}</strong>
                                    <span>{item.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sales_statistics__chart">
                    <h3>Распределение продаж</h3>
                    <ul className="sales_statistics__breakdown">
                        {categoryBreakdown.map((item) => (
                            <li key={item.name}>
                                <div className="sales_statistics__breakdown-name">
                                    <span>{item.name}</span>
                                    <strong>{item.share}%</strong>
                                </div>
                                <div className="sales_statistics__breakdown-bar">
                                    <div style={{ width: `${item.share}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="sales_statistics__table">
                <h3>Топ позиций недели</h3>
                <div className="sales_statistics__table-grid">
                    {topItems.map((item) => (
                        <div key={item.name}>
                            <h4>{item.name}</h4>
                            <p>{item.sold} порций</p>
                            <strong>{item.revenue.toLocaleString('ru-RU')} ₽</strong>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesStatistics;
