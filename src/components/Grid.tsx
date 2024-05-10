import React from "react";
import { format } from "date-fns";

const Grid = () => {
  const hours: string[] = [];
  for (let i = 0; i <= 23; i++) {
    const hour = new Date();
    hour.setHours(i);
    hours.push(format(hour, "HH:mm"));
  }
  return (
    <div
      className="z-30 col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{
        gridTemplateRows: `repeat(48, minmax(${3.6}rem, 1fr))`,
      }}
    >
      {hours.map((hour, index) => (
        <React.Fragment key={index}>
          <div>
            <div className="left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
              {hour}
            </div>
          </div>
          <div />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Grid;
