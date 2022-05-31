import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/addRoomModal/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from './Rooms.module.css'
import { getAllRooms } from '../../http'
// const rooms = [
//     {
//         id: 1,
//         topic: 'which framwork best fro frontend?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 2,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             }
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'which framwork best fro frontend?',
//         speakers: [
//             {
//                 id: 3,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 4,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             }
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'which framwork best fro frontend?',
//         speakers: [
//             {
//                 id: 6,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 7,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             }
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 8,
//         topic: 'which framwork best fro frontend?',
//         speakers: [
//             {
//                 id: 9,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 10,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             }
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 11,
//         topic: 'which framwork best fro frontend?',
//         speakers: [
//             {
//                 id: 12,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             },
//             {
//                 id: 13,
//                 name: 'john doe',
//                 avatar: '/images/monkey-avatar.png'
//             }
//         ],
//         totalPeople: 40,
//     },
// ]

const Rooms = () =>{
    const [modal, setModal] = useState(false)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const fetchRooms = async () =>{
            const { data } = await getAllRooms()
            setRooms(data)
        };
        fetchRooms();
    }, []);

    function openModal(){
        setModal(true)
    }
    return(
        <>
        <div className="container">
            <div className={styles.roomsHeader}>
                <div className={styles.left}>
                    <span className={styles.heading}>All voice rooms</span>
                    <div className={styles.searchBox}>
                        <img className={styles.zz} src="/images/search-icon.png" alt="search" />
                        <input type="text" className={styles.searchInput} />
                    </div>
                </div>
                <div className={styles.right}>
                    <button onClick={openModal} className={styles.startRoomButton}>
                        <img src="/images/add-room-icon.png" alt="add-room" />
                        <span>Start a room</span>
                    </button>
                </div>
            </div>
            <div className={styles.roomList}>
                {rooms.map((room) =>{
                    return <RoomCard key={room.id} room={room} />
                })}
            </div>
        </div>
        { modal && <AddRoomModal onclose={() => setModal(false)}/>}
        </>
    )
}

export default Rooms;