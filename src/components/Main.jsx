import data from "../services/mock_stores.json";

import Table from "./Table"

const Main = () => {
  return (
    <div>
      <h1 style={{color: '#02a469'}}>PROFIT CALCULATION</h1>
      <Table data={data}/>
    </div>
  );
};

export default Main;