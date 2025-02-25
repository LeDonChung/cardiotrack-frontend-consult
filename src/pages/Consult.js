import React from "react";
import { useState } from "react";
import { iconName } from "@fortawesome/free-brands-svg-icons/faAdn";

const userList = [
        {
            id: 1,
            namw: "Chị Tuyền",
            avatar: "https://randomuser.me/api/port",
            status: "online",
            lastMessage: "Ad cho em hỏi về sản phẩm này",
            isCustomerLastMessage: true,
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
            namw: "anh Chung",
            avatar: "https://randomuser.me/api/port",
            status: "online",
            lastMessage: "Dạ cảm ơn Anh/Chị đã liên hệ đến Nhà thuốc Thera Care. Khi nào Anh/Chị cần hỗ trợ vui lòng phản hồi lại thông tin, Nhà thuốc sẽ hỗ trợ Anh/Chị nhanh nhất ạ.",
            isCustomerLastMessage: false,
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
    
    return (
        <div className="h-screen flex bg-gray-100">
            <div className="h-16 w-screen bg-blue-700 text-white content-center justify-between" >
                <h3 className="text-lg font-bold ml-3">TƯ VẤN KHÁCH HÀNG</h3>

                <div className="flex items-center mr-3">
                    
                </div>
            </div>
        
            <div className="" >

            </div>
      </div>
    );
}