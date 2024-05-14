type ranksItem = {
    user: string,
    points: string,
}

const UsersRanks = ({ ranks } : { ranks?:ranksItem[] }) => {
  return (
    (ranks ?
        <ul className="flex flex-col w-full">
            {ranks.map((rank, index) => (
                <li key={index + 1} className={`flex px-[10vw] min-h-[4em] py-2 justify-around gap-5 items-center flex-wrap border-burnt ${index == 0 ? "border-y" : "border-b"}`}>
                    <span>{rank.user}</span>
                    <span>{rank.points} points</span>
                    <span>#{index + 1}</span>
                </li>
            ))}
        </ul>
        :
        <p className="px-10">Pas de classements pour le moment</p>
    )
  )
}

export default UsersRanks;