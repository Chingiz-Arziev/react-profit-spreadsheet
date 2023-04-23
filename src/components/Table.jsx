import React, { useState } from "react";

import '../index.css'

const Table = ({ data }) => {
  const [storeData, setStoreData] = useState(data);

  const handleInputChange = (storeId, monthId, value) => {
    const newStoreData = storeData.map((store) => {
      if (store.store.id === storeId) {
        const newMonths = store.months.map((month) => {
          if (month.id === monthId) {
            return { ...month, value };
          }
          return month;
        });
        return { ...store, months: newMonths };
      }
      return store;
    });
    setStoreData(newStoreData);
  };

  const calculateStoreTotal = (store) => {
      return store.months.reduce((acc, month) => acc + month.value, 0);
  };

  const calculateMonthTotal = (monthIndex) => {
    return storeData.reduce((acc, store) => acc + store.months[monthIndex].value, 0);
  };

  const calculateGrandTotal = () => {
    return storeData.reduce((acc, store) => acc + calculateStoreTotal(store), 0);
  };

  return (
    <div className="table-container">
      <table className="table">

        <thead className="month-header">
          <tr>
            <th>STORES</th>
            {storeData[0].months.map((month) => (
              <th key={month.id}>{month.name}</th>
            ))}
            <th>TOTAL</th>
          </tr>
      </thead>

      <tbody>
      {storeData.map((store) => (
        <tr key={store.store.id}>
          <td className="store-row">{store.store.name}</td>
          {store.months.map((month) => (
            <td key={month.id}>
              <input

                type="number"
                placeholder="profit"
                value={month.value === 0 ? "" : month.value}
                onChange={(e) => {
                  const value = e.target.value.trim()
                  const parsedValue = parseFloat(value)
                  const newValue = isNaN(parsedValue) ? 0 : parsedValue
                  handleInputChange(store.store.id, month.id, newValue)
                  }
                }
              />
            </td>
          ))}
          <td className="total-row">{calculateStoreTotal(store)}</td>
        </tr>
      ))}
      </tbody>

      <tfoot className="total-column">
      <tr>
        <td>MONTH TOTAL</td>
        {storeData[0].months.map((month, index) => (
          <td key={month.id}>{calculateMonthTotal(index)}</td>
        ))}
        <td>GRAND TOTAL {calculateGrandTotal()}</td>
      </tr>
      </tfoot>

    </table>
  </div>
  );
};

export default Table;
