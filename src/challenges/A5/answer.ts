/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 *
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ]
 *
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: Event[] }): PlanningSlot[] {
  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours: string[] = [];
  for (let i = 0; i <= 24; i++) {
    hours.push(
      `${i.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:00`
    );
  }
  hours.pop();
  hours.push("00:00");

  const result: any = [];
  weekday.forEach((day) => {
    for (let i = 0; i < hours.length - 1; i++) {
      const found = events.find((event) => {
        if (event.day !== day) return false;
        const eventStart = Number(event.startTime.split(":")[0]);
        const eventEnd = Number(event.endTime.split(":")[0]);
        const currentStart = Number(hours[i].split(":")[0]);
        const currentEnd = Number(hours[i + 1].split(":")[0]);
        if (eventStart >= currentStart && eventEnd >= currentEnd) return true;
        return false;
      });
      const tmp = {
        startTime: hours[i],
        endTime: hours[i + 1],
        day,
        event: found,
      };
      result.push(tmp);
    }
  });
  return result;
}

// used interfaces, do not touch
export interface Event {
  day: string;
  startTime: string;
  endTime: string;
  name: string;
}

export interface PlanningSlot {
  day: string;
  startTime: string;
  endTime: string;
  event?: Event;
}
