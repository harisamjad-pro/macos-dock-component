import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Dock from "./Dock";

const App = () => {
    const [selectedId, setSelectedId] = useState(null);

    const chats = [
        {
            "name": "Alice",
            "status": "typing",
            "img": "https://images.unsplash.com/photo-1724086576041-34e434df9303?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": ""
        },
        {
            "name": "Bob",
            "status": "message",
            "img": "https://images.unsplash.com/photo-1595347097560-69238724e7bd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Hey, did you get the report?"
        },
        {
            "name": "Charlie",
            "status": "",
            "img": "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Yes, I reviewed the document."
        },
        {
            "name": "David",
            "status": "typing",
            "img": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": ""
        },
        {
            "name": "Eve",
            "status": "seen",
            "img": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "I'll join the meeting at 3 PM."
        },
        {
            "name": "Frank",
            "status": "message",
            "img": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Can you send the files by today?"
        },
        {
            "name": "Grace",
            "status": "typing",
            "img": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": ""
        },
        {
            "name": "Henry",
            "status": "message",
            "img": "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Don't forget to update the spreadsheet."
        },
        {
            "name": "Ivy",
            "status": "seen",
            "img": "https://images.unsplash.com/photo-1589571894960-20bbe2828c10?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "The presentation is ready for review."
        },
        {
            "name": "Jack",
            "status": "message",
            "img": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Let's catch up tomorrow morning."
        },
        {
            "name": "Karen",
            "status": "typing",
            "img": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": ""
        },
        {
            "name": "Leo",
            "status": "message",
            "img": "https://images.unsplash.com/photo-1603415526960-b07ae6cae98b?q=80&w=1350&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "message": "Please review the code changes."
        }
    ];

    return (
        <>
            <Dock />
            {/* <div className="flex items-start justify-between px-16 py-6">
                <div className="grid gap-2 w-1/3 max-h-dvh overflow-y-auto overflow-x-hidden">
                    {chats.map((chat) => (
                        <motion.div key={chat.name} whileHover={{ scale: 1.02, backgroundColor: "#ddf7df" }} whileTap={{ scale: 0.98 }} layoutId={chat.name} onClick={() => setSelectedId(chat.name)} className="flex gap-4 items-center justify-start bg-[#D1EFD3] rounded-lg">
                            <img src={chat.img} alt={chat.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div className="pr-4">
                                <h1 className="text-xl text-[#013C26]">{chat.name}</h1>
                                <p className={`text-sm ${(chat.status === "typing" || chat.status === "message") ? "text-[#01CC4F]" : "text-[#013C26]"}`}>{chat.status === "typing" ? chat.status + `...` : chat.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {selectedId && (
                    <motion.div layoutId={selectedId} className="absolute px-16 py-6 top-0 w-full">
                        <motion.div className={`bg-[#D1EFD3] rounded-lg px-6 py-4`}>
                            <h1 className="text-4xl text-[#013C26]">{selectedId}</h1>
                            <p className="text-base text-[#013C26]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus temporibus corporis corrupti, et maiores assumenda ipsa consequatur vitae blanditiis incidunt magni quisquam fugit amet ipsam doloribus, pariatur dignissimos quos adipisci?</p>
                            <motion.button onClick={() => setSelectedId(null)}>dsas</motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </>
    )
}

export default App;