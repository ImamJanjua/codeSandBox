import React, { useState, useEffect } from "react";
import { DateTime, Interval } from "luxon";

// Generate hours from 12:00 AM till 11:PM
const hours = [];
for (let i = 0; i <= 23; i++) {
  const hour = DateTime.fromObject({ hour: i }).toFormat("h a");
  hours.push(hour);
}
// create 5 minute slots from 12:00 AM to 12:00 PM
let start = DateTime.fromISO("2022-01-01T00:00:00.000Z").set({
  hour: 0,
  minute: 0,
  second: 0,
});
let end = DateTime.fromISO("2022-01-01T00:00:00.000Z").set({
  hour: 24,
  minute: 0,
  second: 0,
});
let interval = Interval.fromDateTimes(start, end);
let slots = [];
interval.splitBy({ minutes: 5 }).forEach((i, index) => {
  slots.push({
    start: i.start.toFormat("h:mm a"),
    end: i.end.toFormat("h:mm a"),
    index: index + 1, // index should starts from 1 because grid-row starts from 1
  });
});

function DayView() {
  const [draggedSlots, setDraggedSlots] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (slot) => {
    console.log("mouse down", slot);
    setIsDragging(true);
    setDraggedSlots([slot]);
  };

  const handleMouseOver = (slot) => {
    if (isDragging) {
      console.log("mouse over", slot);
      setDraggedSlots((prevSlots) => {
        const slotIndexInDraggedSlots = prevSlots.findIndex(
          (s) => s.index === slot.index
        );
        // remove last item if found a slot in dragged slots = drag is in reverse order
        if (slotIndexInDraggedSlots !== -1) {
          console.log("remove last item");
          return prevSlots.slice(0, -1);
        }
        return [...prevSlots, slot];
      });
    }
  };

  const handleMouseUp = (slot) => {
    console.log("mouse up", slot);
    setIsDragging(false);
    setDraggedSlots([]);
  };

  return (
    <div className="flex h-full flex-col p-10">
      {/* container */}
      <div className="flex overflow-auto">
        {/* hours side bar */}
        <div className="w-14 flex-none ring-1 ring-gray-100" />
        {/* 1:1 grid for structuring other grid on same space */}
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          {/* visible grid with hours */}
          <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(48, minmax(3.6rem, 1fr))" }}
          >
            <div className="row-end-1 h-7"></div>
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

          {/* not visible slots grid for values */}
          <div
            className="z-10 col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(288, minmax(0rem, 1fr))" }}
          >
            <div className="row-end-1 h-7"></div>
            {slots.map((slot, index) => (
              <div
                onMouseDown={() => handleMouseDown(slot)}
                onMouseUp={() => handleMouseUp(slot)}
                onMouseOver={() => handleMouseOver(slot)}
                key={index}
                className="opacity-0"
              >
                {slot.start}
              </div>
            ))}
          </div>

          {/* dragged slots */}
          {draggedSlots.length > 1 && (
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
              style={{
                gridTemplateRows: "repeat(288, minmax(0, 1fr)) auto",
              }}
            >
              <div className="row-end-1 h-7"></div>
              <li
                className="relative mt-px flex "
                style={{
                  gridRow: `${draggedSlots[0].index} / span ${draggedSlots.length}`,
                }}
              >
                <div
                  className={`absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5`}
                >
                  <p className={`text-blue-500 `}>
                    <time>{`${draggedSlots[0].start} - ${draggedSlots[draggedSlots.length - 1].end}`}</time>
                  </p>
                  <p className={` font-semibold text-blue-700`}>no title</p>
                </div>
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}

export default DayView;
