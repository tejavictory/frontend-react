import React from 'react';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            transactionList: [
                {
                    customerId: 1,
                    transactionAmount: 10,
                    transactionDate: '12-23-2019'
                },
                {
                    customerId: 1,
                    transactionAmount: 100,
                    transactionDate: '02-23-2020'
                },
                {
                    customerId: 2,
                    transactionAmount: 60,
                    transactionDate: '02-22-2020'
                },
                {
                    customerId: 5,
                    transactionAmount: 10,
                    transactionDate: '12-10-2019'
                },
                {
                    customerId: 3,
                    transactionAmount: 10,
                    transactionDate: '03-10-2019'
                },
                {
                    customerId: 3,
                    transactionAmount: 250,
                    transactionDate: '10-23-2020'
                },
                {
                    customerId: 3,
                    transactionAmount: 1000,
                    transactionDate: '10-10-2020'
                },
                {
                    customerId: 3,
                    transactionAmount: 10,
                    transactionDate: '09-23-2019'
                },
                {
                    customerId: 4,
                    transactionAmount: 10,
                    transactionDate: '01-04-2019'
                },
                {
                    customerId: 1,
                    transactionAmount: 10,
                    transactionDate: '10-10-2020'
                }
            ]

        }
    }

    render() {
        return (<div className="App">
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>
                            CustomerID
                        </th>
                        <th>
                            Month
                        </th>
                        <th>
                            BonusPoints
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.calculateBonus() }
                    </tbody>
                </table>
            </div>
        </div>);
    }


    calculateBonus() {
        var transactions = this.state.transactionList;
        var cusBonus = new Map();
        for (let i = 0; i < transactions.length; i++) {
            var temp = new Map();
            var cusId = parseInt(transactions[i].customerId);
            var date = transactions[i].transactionDate;
            var amount = parseInt(transactions[i].transactionAmount);
            var month = parseInt(date.split("-")[0]);
            console.log(' ', cusId, ' ', month, ' ', amount);
            if (cusBonus.has(transactions[i].customerId)) {
                if (cusBonus.get(cusId).has(month)) {
                    cusBonus.get(cusId).set(month, cusBonus.get(cusId).get(month) + this.calcBonus(amount));
                } else {
                    cusBonus.get(cusId).set(month, this.calcBonus(amount));
                }
            } else {
                temp.set(month, this.calcBonus(amount));
                cusBonus.set(cusId, temp);
            }
        }
        var returnItem = [];

        cusBonus.forEach((subMap, cus) => {
            subMap.forEach((bonus, month) => {
                returnItem.push(<tr><td>{cus}</td><td>{month}</td><td>{bonus}</td></tr>);
            })
        });
        console.log(returnItem);
        return returnItem;
    }

    calcBonus(amt) {
        var bonus = 0;
        if (amt > 100) {
            bonus += (amt - 100) * 2 + 50;
        } else if (amt > 50) {
            bonus += (amt - 50);
        }
        return bonus;
    }
}

export default App;
