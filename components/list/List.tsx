import { getList } from "@utils/getData";
import { getServerSession } from "next-auth";
import authOptions from "@utils/authOptions";
import ListEditor from "./ListEditor";

const List = async ({ identifier }: { identifier: string }) => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const list = await getList(identifier);
    console.log(list)
    console.log(identifier)
    if (list && list.elements) list.elements.sort((a, b) => (parseInt(b[0]) - parseInt(a[0])));

  return (
    <i className="relative flex flex-col gap-8 my-5">
        <span className="absolute top-[-1rem] right-10">
            {user && user.right >= 2 && 
                <ListEditor list={list && list.elements ? list.elements : []} identifier={identifier} />
            }
        </span>
        {list && list.elements ?
        <ul>
            {list.elements.map((elem, index) => (
                <li key={index} className={`flex py-2 items-center gap-5 flex-wrap justify-between px-14 rounded-sm ${index % 2 === 0 ? "bg-black/10" : ""} mobile:justify-around`}>
                    {elem.map((text, i) => (
                        <span key={i} className={i === 0 ? "font-bold" : ""}>{text}</span>
                    ))}
                </li>
            ))}
        </ul>
        :
        <p>Aucun éléments à afficher pour le moment!</p>
        }
    </i>
  )
}

export default List;