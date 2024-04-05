import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { DateTime, Interval } from "luxon";

const hours = [];
for (let i = 0; i <= 23; i++) {
  const hour = DateTime.fromObject({ hour: i }).toFormat("h a");
  hours.push(hour);
}
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
  const gridRef = useRef(null);

  useEffect(() => {
    console.log("draggedSlots", draggedSlots);
  }, [draggedSlots]);

  const handleMouseDown = useCallback((event) => {
    console.log("mouse down", event);
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDragging) {
        return;
      }

      window.requestAnimationFrame(() => {
        const gridRect = gridRef.current.getBoundingClientRect();
        console.log("gridRect", gridRect);
        const relativeY = event.clientY - gridRect.top;
        const slotHeight = gridRect.height / slots.length;
        const slotIndex = Math.floor(relativeY / slotHeight);
        const slot = slots[slotIndex];
        console.log("mouse move", event);

        setDraggedSlots((prevSlots) => {
          const slotIndexInDraggedSlots = prevSlots.findIndex(
            (s) => s.index === slot.index
          );

          if (slotIndexInDraggedSlots !== -1) {
            if (slotIndexInDraggedSlots !== prevSlots.length - 1) {
              return prevSlots.slice(0, -1);
            } else {
              return prevSlots;
            }
          }
          return [...prevSlots, slot];
        });
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback((event) => {
    console.log("mouse up", event);
    setIsDragging(false);
    setDraggedSlots([]);
  }, []);

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
            className=" col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(48, minmax(3.6rem, 1fr))" }}
          >
            {/* <div className="row-end-1 h-7"></div> */}
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

          <div
            className="z-10 col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
            style={{ gridTemplateRows: "repeat(288, minmax(0rem, 1fr))" }}
            ref={gridRef}
          >
            {slots.map((slot, index) => (
              <div
                onMouseDown={handleMouseDown}
                onMouseOver={handleMouseMove}
                onMouseUp={handleMouseUp}
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
              {/* <div className="row-end-1 h-7"></div> */}
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
