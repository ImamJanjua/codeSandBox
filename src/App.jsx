import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const appointmentsSlots = [
  {
    appointmentId: null,
    patientName: null,
    time: "12:00 PM - 12:05 PM",
  },
  {
    appointmentId: null,
    patientName: null,
    time: "12:05 PM - 12:10 PM",
  },
  {
    appointmentId: "1",
    patientName: "May Doe",
    time: "12:10 PM - 12:15 PM",
  },
  {
    appointmentId: "1",
    patientName: "El Doe",
    time: "12:15 PM - 12:20 PM",
  },
  {
    appointmentId: null,
    patientName: null,
    time: "12:20 PM - 12:25 PM",
  },
];

// Generate appointment slots for every 5 minutes from 12:00 to 14:00 PM
const slots = [];
for (let i = 12; i < 14; i++) {
  for (let j = 0; j < 60; j += 5) {
    const time = DateTime.fromObject({ hour: i, minute: j }).toFormat(
      "HH:mm a"
    );
    slots.push(time);
  }
}

function App() {
  const [appointments, setAppointments] = useState([]);

  // group appointments which are same by appointmentId
  useEffect(() => {
    const groupedAppointments = [];
    appointmentsSlots.forEach((slot) => {
      if (slot.appointmentId !== null) {
        const tempSlots = appointmentsSlots.filter(
          (s) => s.appointmentId === slot.appointmentId
        );
        groupedAppointments.push(tempSlots);
      }
    });
    console.log("groupedAppointments", groupedAppointments);
    setAppointments(groupedAppointments);
  }, []);

  return (
    <div className="p-16">
      <div>
        {/* map to show the slots and here also wanna show the appointments */}
        {slots.map((slot) => (
          <div
            key={slot}
            className="flex h-10 items-center justify-center border-b-2"
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
