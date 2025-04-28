import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login,fetchUserInfo } from "../redux/slice/UserSlice";
import showToast from "../utils/AppUtils";


export const Login = () => {
    const [userLogin, setUserLogin] = useState({
        username: '1900637644',
        password: "123456"
    });

    const error = useSelector(state => state.user.errorResponse);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlerActionLogin = async (e) => {
        e.preventDefault();

        try {
            await dispatch(login(userLogin)).unwrap().then(async (res) => {
                await dispatch(fetchUserInfo());
                navigate("/consult");

            }).catch(err => showToast("Tài khoản hoặc mật khẩu không chính xác.", 'error'));
            
        } catch (error) {
            console.error("❌ Lỗi đăng nhập:", error);
            showToast("Tài khoản hoặc mật khẩu không chính xác.", "error");
        }
    };

    return (
        <div className="bg-white text-gray-900">
            {/* Main Content */}
            <main className="container mx-auto mt-16">
                <div className="max-w-md mx-auto bg-white p-8 ">
                    <h2 className="text-center text-xl font-bold mb-4 text-custom-size">Đăng nhập với tài khoản - mật khẩu được cung cấp cho tư vấn viên</h2>
                    <form id="formLogin" onSubmit={e => handlerActionLogin(e)}>
                        <div class="flex items-center border-b border-gray-300 pb-2 mb-4">
                            <div class="flex-shrink-0 flex-1 flex items-center">
                                <img
                                    src="/icon/ic_user_register.png"
                                    alt="Thera Care Logo"
                                    className="h-6 w-6"
                                />
                                <input
                                    value={userLogin.username}
                                    onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })}
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="Số điện thoại"
                                    className="flex-1 w-full ml-2 py-1 focus:outline-none text-custom-size"
                                />
                            </div>
                        </div>
                        <div class="flex items-center border-b border-gray-300 pb-2 mb-4">
                            <div class="flex-shrink-0 flex-1 flex items-center">
                                <img
                                    src="/icon/ic_lock.png"
                                    alt="Thera Care Logo"
                                    className="h-6 w-6"
                                />
                                <input
                                    value={userLogin.password}
                                    onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                                    type="password"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    className="flex-1 w-full ml-2 py-1 focus:outline-none text-custom-size"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#005AE0] text-white py-2 rounded-[0.5rem]">
                            Đăng nhập
                        </button>
                    </form>
                    <div className="flex justify-between mt-4">
                        <a href="#" className="text-blue-600">Quên mật khẩu</a>
                    </div>
                </div>
            </main>
        </div>
    );
}