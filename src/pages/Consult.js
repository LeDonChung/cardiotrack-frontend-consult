import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";


const initialMessages = {
    "sender": {
        "id": 0,
        "username": ""
    },
    "receiver": {
        "id": 0,
        "username": ""
    },
    "content": "",
}

export default function Consult() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);
    const [messageSend, setMessageSend] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [usersOnline, setUsersOnline] = useState([]);

    useEffect(() => {
        const getUserList = async () => {
            try {
                const res = await axios.get("http://localhost:9095/api/messages");
                
                return res.data;
            } catch (error) {
                console.error("Lỗi khi tải danh sách user", error);
            }
        }

        getUserList().then((data) => {
            setUsers(data);
        });
    }, [users]);

    useEffect(() => {
        // Kết nối WebSocket
        const socket = new SockJS("http://localhost:9095/ws");
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("WebSocket Connected");

                // Subscribe để nhận tin nhắn mới
                client.subscribe("/topic/messages", (msg) => {

                    // const receivedMessage = JSON.parse(msg.body);
                    // console.log("📩 New message:", receivedMessage);
                    // if (selectedUser && receivedMessage.senderId === selectedUser.id) {
                    //     setMessageList(prev => [...prev, JSON.parse(msg.body)]);
                    // }
                    setMessageList(prev => [...prev, JSON.parse(msg.body)]);
                });

                // Subscribe to online users list topic (danh sách người dùng)
                client.subscribe(`/topic/online-users`, (msg) => {
                    console.log("👥 Online users:", msg.body);
                    setUsersOnline(JSON.parse(msg.body));
                });

            },
            onStompError: (frame) => {
                console.error("❌ STOMP Error:", frame.headers['message']);
            },

            onWebSocketError: (error) => {
                console.error("🚨 WebSocket Error:", error);
            },

            onDisconnect: () => {
                console.log("🔴 WebSocket disconnected!");
            },
            onDisconnect: () => console.log("Disconnected"),
        });
        client.activate();
        setStompClient(client);

        return () => client.deactivate();
    }, []);

    const sendMessage = () => {
        if (!newMessage.trim() || !stompClient || !stompClient.connected) {
            console.error("🚨 Không thể gửi tin nhắn! WebSocket chưa kết nối.");
            return;
        }

        const newMessageObj = {
            sender: {
                id: 0,
            },
            receiver: {
                id: selectedUser.id,
                username: selectedUser.fullName,
            },
            content: newMessage
        };
        setSelectedUser({ ...selectedUser, messages: [...selectedUser.messages, newMessageObj] });

        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify(newMessageObj)
        });
        setNewMessage("");
    }

    const fileInputRef = useRef(null);

    const handleAttachClick = () => {
        fileInputRef.current.click(); // Kích hoạt input file khi nhấn vào button
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("File đã chọn:", file.name);
        }
    };

    useEffect(() => {
    }, [selectedUser]);

    return (
        users && (
            <div className="h-screen flex flex-col bg-gray-100">
                {/* Header */}
                <div className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 font-bold flex items-center justify-between shadow-lg z-50">
                    <div className="flex items-center space-x-2">
                        <img src="../../assets/img/logo.png" />
                        <span>TƯ VẤN KHÁCH HÀNG</span>
                    </div>

                    <div>
                        <button>
                            <FontAwesomeIcon icon={faXmark} size="lg" className="text-white" />
                        </button>
                    </div>
                </div>
                {/* Main Chat Section */}
                <div className="flex flex-1 mt-[80px]">
                    <div className="w-1/4 bg-white border-r p-4 h-full overflow-y-auto">
                        {users.map((user, index) => (
                            <button className="w-full" key={index} onClick={() => {
                                setSelectedUser(user);
                                setMessageList(user.messages);
                            }}>
                                <div className={`p-2 ${user.id === selectedUser?.id ? "bg-blue-300" : "bg-gray-200"} rounded-lg m-2 text-start`}>
                                    <span className=" ml-5">{user.username}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 flex flex-col p-4 bg-gray-50">
                        <div className="flex flex-col space-y-2 h-[calc(100%-100px)] overflow-y-auto mb-[100px]">
                            {messageList.map((msg, index) => (
                                <div key={index} className={`flex ${(msg.senderId === selectedUser.id) ? "justify-start" : "justify-end"}`}>
                                    <div className={`${(msg.senderId === selectedUser.id) ? "bg-gray-300" : "bg-blue-600 text-white"} px-4 py-2 rounded-lg max-w-xs`}>
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {
                            selectedUser && (
                                <div className="fixed bottom-0 right-0 w-3/4 bg-white border-t flex items-center p-4">
                                    <input
                                        type="text"
                                        placeholder="Nhập tin nhắn..."
                                        className="flex-1 p-2 border rounded-lg mx-2"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button onClick={sendMessage}>
                                        <FontAwesomeIcon icon={faPaperPlane} size="lg" className="text-blue-600" />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>


            </div>
        )
    );
}