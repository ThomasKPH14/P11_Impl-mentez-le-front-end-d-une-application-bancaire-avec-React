import React, { useState } from 'react';

import ArrowTransaction from '../assets/arrow_down.png';

const initialData = [
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
  { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00', transactionType: 'Electronic' },
];

const categories = ['Food', 'Taxes', 'Bills', 'Housing', 'Transportation', 'Entertainment', 'Health', 'Education', 'Clothing', 'Savings and Investments', 'Miscellaneous', 'Vacation and Travel'];

function Transactions() {
  // console.log(transactions);

  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };

  const handleCategoryChange = (index, newCategory) => {
    const newData = [...data];
    newData[index].category = newCategory;
    setData(newData);
  };

  const handleNoteChange = (index, newNote) => {
    const newData = [...data];
    newData[index].note = newNote;
    setData(newData);
  };

  return (
    <div className='transaction-table'>
      <div className='transaction-table-header'>
        <div>Date</div>
        <div>Description</div>
        <div>Amount</div>
        <div>Balance</div>
        <div></div>
      </div>
      <div className='transaction-table-body'>
        {data.map((row, index) => (
          <button key={index} className='transaction-row-container' >
            <div className='transaction-row' onClick={() => handleRowClick(index)}>
              <div className='transaction-row-title'>{row.date}</div>
              <div>{row.description}</div>
              <div>{row.amount}</div>
              <div>{row.balance}</div>
              <img className='transaction-arrow' src={ArrowTransaction} alt="arrow transaction" />
            </div>
            {index === selectedRow && (
              <div className='transaction-subtable'>
                <div className='transaction-table-subcategory'>
                  <div className='transaction-table-subcategory-title'>Transaction Type</div>
                  <div>{row.transactionType}</div>
                </div>
                <div className='transaction-table-subcategory'>
                  <div className='transaction-table-subcategory-title'>Category</div>
                  <div>
                    <select className='transaction-subcategory-edit' onChange={(e) => handleCategoryChange(index, e.target.value)}>
                      {categories.map((category, idx) => (
                        <option key={idx} value={category}>{category}</option>
                      ))}
                    </select>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </div>
                </div>
                <div className='transaction-table-subcategory'>
                  <div className='transaction-table-subcategory-title'>Note</div>
                  <div>
                    <input type="text" onChange={(e) => handleNoteChange(index, e.target.value)} placeholder='lorem ipsum' />
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Transactions;