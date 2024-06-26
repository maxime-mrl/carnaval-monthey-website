import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { getList } from "@utils/getData";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "@utils/authOptions";
import EventListEditor from "./EventListEditor";

type events = {
    date: string,
    title: string,
    time: string,
    place: string,
    infos: string | null,
};

const EventsList = async () => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const weekEvents = await getList("events");
    if (!weekEvents || !weekEvents.elements) return (
        <i className="relative">
            <span className="absolute top-[-5rem] right-[10vw]">
                {user && user.right >= 2 && 
                    <EventListEditor events={[]}/>
                }
            </span>
            <h3 className='h3 container-size'>Aucun événements prévus pour le moment!</h3>
        </i>
    );
    const parsedevents: Map<string, events[]> = new Map();
    weekEvents.elements.forEach(event => {
        const updatedEvents = parsedevents.get(event[0]) ? parsedevents.get(event[0]) as events[] : [];
        updatedEvents.push({
            date: event[0],
            title: event[1],
            time: event[2],
            place: event[3],
            infos: event[4] ? event[4] : null,
        });
        parsedevents.set(event[0], updatedEvents);
    });

  return (
    <i className="relative flex flex-col gap-8">
        <span className="absolute top-[-3rem] left-10">
            {user && user.right >= 2 && 
                <EventListEditor events={weekEvents.elements}/>
            }
        </span>
        {[...parsedevents].map(([day, events]) => (
            <>
                <h3 key={day} className='h3 container-size'>{day}</h3>
                {events ?
                    <ul className="flex flex-col gap-2 w-full">
                        {events.map((event, index) => (
                            <li key={index} className="flex px-[10vw] min-h-[4em] py-2 justify-between gap-5 items-center flex-wrap bg-gradient-to-r from-burnt to-arylide mobile:justify-around">
                                <div className="text-snow flex justify-center gap-6 flex-wrap font-bouncy">
                                    <span>{event.title}</span>
                                    <span>{event.time}</span>
                                    <span>
                                        <FontAwesomeIcon className="w-8" icon={faLocationDot}/>
                                        {event.place}
                                    </span>
                                </div>
                                { event.infos ?
                                <Link href={"#"}>
                                    Plus d&apos;Info
                                </Link>
                                :
                                <span className="h4 px-6 opacity-0 h-0">Plus d&apos;Info</span>
                                }  
                            </li>
                        ))}
                    </ul>
                :
                    <p className="px-10">Aucun evenement aujourd&apos;hui!</p>}
            </>
        ))
        }
    </i>
  )
}

export default EventsList;