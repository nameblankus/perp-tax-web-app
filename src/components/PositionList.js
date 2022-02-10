import Position from "./Position";

function PositionList({ positions }) {

  return (
    <div className="mt-5">
      <h5>Current Positions</h5>
      {
        positions.map((position) => (
          <Position
            key={position.id}
            position={position}
            tokenName={true} />
        ))
      }
    </div>
  )
}

export default PositionList;
