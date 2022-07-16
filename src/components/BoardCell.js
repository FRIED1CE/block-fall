import "./BoardCell.css";

const BoardCell = ({ cell }) => (
    <div className={`Boardcell ${cell.className}`}>
        {/* <div className="Sparkle"></div> */}
    </div>
);

export default BoardCell;