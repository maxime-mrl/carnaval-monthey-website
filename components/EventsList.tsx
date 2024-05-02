"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./ui/button";

type eventItem = {
    title: string,
    Time: string,
    place: string,
    infos: null | string,
}

const EventsList = ({ events } : { events:eventItem[] }) => {
  return (
    (events ?
        <ul className="flex flex-col gap-2 w-full">
            {events.map((event, index) => (
                <li key={index} className="flex px-10 min-h-[4em] py-2 justify-between gap-5 items-center flex-wrap bg-gradient-to-r from-burnt to-arylide md:justify-around">
                    <div className="text-snow flex justify-center gap-6 flex-wrap text-bouncy">
                        <span>{event.title}</span>
                        <span>{event.Time}</span>
                        <span>
                            <FontAwesomeIcon className="w-8" icon={faLocationDot}/>
                            {event.place}
                        </span>
                    </div>
                    { event.infos ?
                    <Button variant="default" className="p-6" onClick={() => {}}>
                        <span className="text-snow text-bouncy-shadow text-2xl">
                            Plus d&apos;Info
                        </span>
                    </Button>
                    :
                    <span className="text-2xl px-6 opacity-0 h-0">Plus d&apos;Info</span>
                    }  
                </li>
            ))}
        </ul>
        :
        <p className="px-10">Aucun evenement aujourd&apos;hui!</p>
    )
  )
}

export default EventsList;