import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cellListItem";
import AddCell from "./addCell";
import { Fragment } from "react";

const CellList: React.FC = () => {
  const cells =  useTypedSelector(({cells: {order, data}})=>{
     return order.map(id => data[id]);
  });

  const renderedCells = cells.map(cell=>
  <Fragment key={cell.id}>
    <CellListItem cell={cell}/>
    <AddCell prevCellId={cell.id}/>
  </Fragment>
  );

  return <div>
    <AddCell forceVisible={cells.length === 0} prevCellId={null}/>
    {renderedCells}
    </div>;
};

export default CellList;