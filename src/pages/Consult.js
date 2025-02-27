import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";

const userList = [
    {
        id: 1,
        name: "Chị Tuyền",
        status: "online",
        lastMessage: "Ad cho em hỏi về sản phẩm này",
        isCustomerLastMessage: true,
        unreadMessages: 1,
        isOpen: true,
        messages: [
            {
                id: 1,
                content: "Bắt đầu",
                isCustomer: true,
                sendDate: "2022-01-01T12:00:00Z"
            },
            {
                id: 2,
                content: "Thera Care có thể hỗ trợ gì cho Anh/Chị ạ?",
                isCustomer: false,
                sendDate: "2022-01-01T12:01:00Z"
            },
            {
                id: 3,
                content: "Cảm ơn Anh/Chị đã liên hệ Nhà thuốc Thera Care! Dạ mình có thể cho em xin tên để tiện xưng hô được không ạ? Dạ mình cần em hỗ trợ thông tin gì ạ?",
                isCustomer: false,
                sendDate: "2022-01-01T12:02:00Z"
            },
            {
                id: 4,
                content: "Dạ cảm ơn Anh/Chị đã liên hệ đến Nhà thuốc Thera Care. Khi nào Anh/Chị cần hỗ trợ vui lòng phản hồi lại thông tin, Nhà thuốc sẽ hỗ trợ Anh/Chị nhanh nhất ạ. Chúc Anh/Chị Năm Mới Sức Khỏe Như Ý - Vạn Sự Cát Tường.",
                isCustomer: false,
                sendDate: "2022-01-01T12:02:00Z"
            },
            {
                id: 5,
                content: "Chị ơi, em muốn hỏi về sản phẩm này",
                isCustomer: true,
                sendDate: "2022-01-01T12:05:00Z"
            }
        ]
    },
    {
        id: 2,
        name: "anh Chung",
        status: "online",
        lastMessage: "Dạ cảm ơn Anh/Chị đã liên hệ đến Nhà thuốc Thera Care. Khi nào Anh/Chị cần hỗ trợ vui lòng phản hồi lại thông tin, Nhà thuốc sẽ hỗ trợ Anh/Chị nhanh nhất ạ.",
        isCustomerLastMessage: false,
        isOpen: false,
        unreadMessages: 1,
        messages: [
            {
                id: 1,
                content: "Bắt đầu",
                isCustomer: true,
                sendDate: "2022-01-01T12:00:00Z"
            },
            {
                id: 2,
                content: "Thera Care có thể hỗ trợ gì cho Anh/Chị ạ?",
                isCustomer: false,
                sendDate: "2022-01-01T12:01:00Z"
            },
            {
                id: 3,
                content: "Cảm ơn Anh/Chị đã liên hệ Nhà thuốc Thera Care! Dạ mình có thể cho em xin tên để tiện xưng hô được không ạ? Dạ mình cần em hỗ trợ thông tin gì ạ?",
                isCustomer: false,
                sendDate: "2022-01-01T12:02:00Z"
            },
            {
                id: 4,
                content: "Dạ cảm ơn Anh/Chị đã liên hệ đến Nhà thuốc Thera Care. Khi nào Anh/Chị cần hỗ trợ vui lòng phản hồi lại thông tin, Nhà thuốc sẽ hỗ trợ Anh/Chị nhanh nhất ạ.",
                isCustomer: false,
                sendDate: "2022-01-01T12:02:00Z"
            }
        ]
    }
]
export default function Consult() {

    const [users, setUsers] = useState(userList);
    const [selectedUser, setSelectedUser] = useState(userList[0]);
    const [newMessage, setNewMessage] = useState("");
    const sendMessage = () => {
        if (newMessage.trim() === "") {
            return;
        }
        const newMessageObj = {
            id: selectedUser.messages.length + 1,
            content: newMessage,
            isCustomer: false,
            sendDate: new Date().toISOString()
        };
        setSelectedUser({ ...selectedUser, messages: [...selectedUser.messages, newMessageObj] });
        const newSelectedUser = {
            ...selectedUser,
            messages: [...selectedUser.messages, newMessageObj]
        };
        const newUsers = users.map((user) => {
            if (user.id === selectedUser.id) {
                return newSelectedUser;
            }
            return user;
        });
        setUsers(newUsers);
        setNewMessage("");
    };

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
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 font-bold flex items-center justify-between">
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
            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-1/4 bg-white border-r p-4">
                    {
                        users.map((user, index) => (
                            <button className="w-full" key={index} onClick={() => setSelectedUser(user)}>
                                <div className={`flex items-center space-x-2 p-2 ${user.id === selectedUser.id ? "bg-blue-300" : "bg-gray-200"} rounded-lg m-2`}>
                                    <span>{user.name}</span>
                                </div>
                            </button>
                        ))
                    }

                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col p-4 bg-gray-50">
                    <div className="flex items-center justify-center mb-2">
                        <span className="bg-gray-300 text-xs px-2 py-1 rounded-full">01-02-2025</span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {
                            selectedUser.messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.isCustomer ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`${msg.isCustomer ? "bg-gray-300 text-black" : "bg-blue-600 text-white"} 
                                px-4 py-2 rounded-lg max-w-xs`}
                                    >
                                        <p>
                                            {msg.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* Input Section */}
                    <div className="fixed bottom-0 right-0 w-3/4 bg-white border-t flex items-center p-4">
                        <button onClick={handleAttachClick} className="text-blue-600">
                            <FontAwesomeIcon icon={faPaperclip} size="lg" />
                        </button>
                        {/* Input file ẩn */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <input
                            type="text"
                            placeholder="Enter your message here"
                            className="flex-1 p-2 border rounded-lg mx-2"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button className="p-2 text-white rounded-lg" onClick={sendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} size="lg" className="text-blue-600" />
                        </button>
                    </div>

                </div>
            </div>


        </div>
    );
}