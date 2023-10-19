import React, { useEffect, useState } from 'react';
import Blank from '../../layouts/Blank';
import { Link, useNavigate } from 'react-router-dom';
import AuthModel from '../../models/AuthModel';
import Swal from "sweetalert2";
import UserModel from '../../models/UserModel';
import { array } from 'yup';

function ForgotPassword(props) {
    const [email, setEmail] = useState({
        email: ''
    });
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false); // Thêm biến trạng thái isProcessing
    const handleForgotSuccess = () => {
        Swal.fire({
            icon: "success",
            title: "Mật Khẩu mới đã được gửi vào email!",
            showConfirmButton: false,
            timer: 3000,
        });
    };
    const arrayEmails = [];
    useEffect(()=>{
        UserModel.all()
            .then((res) => {
                setUsers(res);
            })

    },[]);
    users.forEach((user) => {
        arrayEmails.push(user.email);
    });

    const handleForgot = async (e) => {
        e.preventDefault();
        setIsProcessing(true); // Bắt đầu xử lý, đặt giá trị isProcessing thành true
        const isFound = arrayEmails.includes(email.email);
        if(isFound){
            try {
              AuthModel.fogotpassword({ email: email.email })
                .then((res) => {
                  handleForgotSuccess();
                })
                .catch((error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'thất bại!',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                })
                .finally(() => {
                  setIsProcessing(false); // Kết thúc xử lý, đặt giá trị isProcessing thành false
                });
            } catch {
              Swal.fire({
                icon: 'error',
                title: 'thất bại!',
                showConfirmButton: false,
                timer: 3000,
              });
            }
        }else{
            setIsProcessing(false);
            Swal.fire({
                icon: 'error',
                title: 'Nhập sai email!',
                showConfirmButton: false,
                timer: 3000,
              });
        }
    };
    const handleOnChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value });
    }

    return (
        <Blank>
            <form onSubmit={handleForgot} action="#" className="auth-form auth-form-reflow">
                <div className="text-center mb-4">
                    <div className="mb-4">
                        <img
                            className="rounded"
                            src="assets/apple-touch-icon.png"
                            alt=""
                            height={72}
                        />
                    </div>
                    <h1 className="h3"> Đặt Lại Mật Khẩu </h1>
                </div>
                <p className="mb-4"></p>
                {/* .form-group */}
                <div className="form-group mb-4">
                    <label className="d-block text-left" htmlFor="inputUser">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        defaultValue=""
                        required=""
                        autofocus=""
                        className="form-control form-control-lg"
                        value={email.email}
                        onChange={handleOnChange}
                    />
                    <p className="text-muted">
                        <small>
                            Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email của bạn.
                        </small>
                    </p>
                </div>
                {/* /.form-group */}
                {/* actions */}
                <div className="d-block d-md-inline-block mb-2">
                    {isProcessing ? ( // Sử dụng kiểm tra isProcessing để điều khiển hiển thị của nút và dòng chữ
                        <p>Vui lòng chờ!</p>
                    ) : (
                        <button className="btn btn-lg btn-block btn-primary" type="submit">
                            Đặt Lại Mật Khẩu
                        </button>
                    )}
                </div>
                <div className="d-block d-md-inline-block">
                    <Link to={'/login'} className="btn btn-block btn-light">
                        Quay Về Đăng Nhập
                    </Link>
                </div>
            </form>

        </Blank>
    );
}

export default ForgotPassword;