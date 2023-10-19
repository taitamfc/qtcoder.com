import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Thêm import cho useDispatch
import { SET_CART } from '../redux/action';
import Swal from 'sweetalert2';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import RoomModel from '../models/RoomModel';
import BorrowModel from '../models/BorrowModel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SignupSchema = Yup.object().shape({
    borrow_date: Yup.string().required('Vui lòng nhập ngày mượn!'),
});

function Cart(props) {
    const navigate = useNavigate();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        borrow_date: '',
        borrow_note: '',
        devices:
        {
            id: [],
            lesson_name: [],
            quantity: [],
            session: [],
            lecture_name: [],
            room_id: [],
            lecture_number: [],
            return_date: [],
        }
    });
    const dispatch = useDispatch();

    const [rooms, setRooms] = useState([]);
    const [createdAt, setCreatedAt] = useState('');

    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ local storage
    const [userData, setUserData] = useState(user);
    useEffect(() => {

        // Lấy ngày hiện tại và định dạng thành chuỗi yyyy-MM-ddTHH:mm để điền vào trường "Ngày tạo phiếu"
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd/MM/yyyy");
        setCreatedAt(formattedDate);
        RoomModel.getRoom()
            .then((response) => {
                setRooms(response);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);
    
    useEffect(() => {

        
        // Set gia tri cho cart
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setData(cartData);

        //console.log(cartData);

       let emptyDevice = [];
        let emptyLessons = [];
        let emptyQuantity = [];
        let emptySession = [];
        let emptyLecture = [];
        let emptyRoom = [];
        let emptyLectureNumber = [];
        let emptyReturn = [];

        for (let i = 0; i < cartData.length; i++) {
            emptyDevice.push(cartData[i].device_id)
            emptyLessons.push('')
            emptyQuantity.push(cartData[i].quantity)
            emptySession.push('Sáng')
            emptyLecture.push('')
            emptyRoom.push('1')
            emptyLectureNumber.push('1')
            emptyReturn.push('')
        }
        const new_devices = {
            id: emptyDevice,
            lesson_name: emptyLessons,
            quantity: emptyQuantity,
            session: emptySession,
            lecture_name: emptyLecture,
            room_id: emptyRoom,
            lecture_number: emptyLectureNumber,
            return_date: emptyReturn,
        }

        //console.log(userData);
        setFormData({
            ...formData,
            devices: new_devices,
            user_id: userData.id
        });
    }, []);
  // Set gia tri mac dinh cho lesson_name va quantity
       


    const handleRemove = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(newData));
        dispatch({
            type: SET_CART,
            payload: newData,
        });
        setData(newData);
    };


    const handleSubmit = (values, { resetForm }) => {
        BorrowModel.checkBorrow(values).then((res) => {
            if (res.success) {
                BorrowModel.createBorrow(values).then((response) => {
                    //console.log('Borrow record created successfully:', response.data);
                    localStorage.removeItem('cart');
                    dispatch({ type: SET_CART, payload: [] });
                    // Show a success message in Vietnamese
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công!',
                        text: 'Tạo phiếu mượn thành công!',
                    });
                    resetForm(); // Clear the form fields if needed
                    navigate('/borrows'); // Navigate to the 'borrows' page
                })
            }else{
                //console.log(res);
                Swal.fire({
                    icon: 'error',
                    title: 'Có thiết bị đang được mượn',
                    html: res.error_html,
                    width: 800,
                });
            }
        }).catch((error) => {

        })
    };
    if (acc1 !== null){

    return (
        <LayoutMaster>

            <header className="page-title-bar">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">
                            <Link to="/">
                                <i className="breadcrumb-icon fa fa-angle-left mr-2" />
                                Trang Chủ
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className="d-md-flex align-items-md-start">
                    <h1 className="page-title mr-sm-auto"> Phiếu Mượn</h1>
                </div>
            </header>
            <Formik
                initialValues={formData}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="card">
                            <div className="card-body">
                                <legend>Thông tin cơ bản</legend>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="user_id">Người mượn</label>
                                            <p className='form-control-static'>{userData ? userData.name : ''}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="created_at">Ngày tạo phiếu</label>
                                            <p className='form-control-static'>{createdAt}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="borrow_date">Ngày mượn</label>
                                            <Field
                                                type="date"
                                                name="borrow_date"
                                                className="form-control"
                                                placeholder="Nhập ngày mượn"
                                            />
                                            {errors.borrow_date && touched.borrow_date ? (
                                                <div style={{ color: 'red' }}>{errors.borrow_date}</div>
                                            ) : null}

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="borrow_note">Ghi chú</label>
                                    <Field as="textarea"
                                        name="borrow_note"
                                        className="form-control"
                                        placeholder="Nhập ghi chú"
                                    />
                                    {errors.borrow_note && touched.borrow_note ? (
                                        <div className="text-danger">{errors.borrow_note}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-body">
                            <legend>Chi tiết phiếu mượn</legend>
                                    <div className="row mb-2">
                                        <div className="col"></div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Tên</th>
                                                    <th>Số lượng</th>
                                                    <th>Tên bài dạy</th>
                                                    <th>Buổi</th>
                                                    <th>Tiết PCCT</th>
                                                    <th>Lớp</th>
                                                    <th>Tiết TKB</th>
                                                    <th>Ngày dạy</th>

                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={item.device_id}>
                                                        <td>{index + 1}</td>
                                                        <td className="device-cell">
                                                            <div className="device-info">
                                                                <Field type="hidden" name={`devices[id][${index}]`} value={item.device_id} />
                                                                <Link to={`/borrows/${item.device_id}`} className="tile tile-img mr-1">
                                                                    <img
                                                                        className="img-fluid"
                                                                        src={item.device && item.device.url_image ? item.device.url_image : ''}
                                                                        alt={item.name}
                                                                    />
                                                                </Link>
                                                                <span>{item.device ? item.device.name : 'Tên không tồn tại'}</span>
                                                            </div>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={`devices[quantity][${index}]`}
                                                                type="number"
                                                                className="form-control input-sm"
                                                            />
                                                        </td>


                                                        <td>
                                                            <Field
                                                                name={`devices[lesson_name][${index}]`}
                                                                type="text"
                                                                className="form-control input-sm"

                                                            />
                                                        </td>

                                                        <td width="120">
                                                            <Field
                                                                name={`devices[session][${index}]`}
                                                                as="select"
                                                                className="form-control"
                                                            >
                                                                <option value="Sáng">Sáng</option>
                                                                <option value="Chiều">Chiều</option>
                                                            </Field>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={`devices[lecture_name][${index}]`}
                                                                type="text"
                                                                className="form-control input-sm"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`devices[room_id][${index}]`}
                                                                as="select"
                                                                className="form-control"
                                                            >
                                                                {/* Sử dụng danh sách phòng từ state */}
                                                                {rooms.map((room) => (
                                                                    <option key={room.id} value={room.id}>{room.name}</option>
                                                                ))}
                                                            </Field>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name={`devices[lecture_number][${index}]`}
                                                                as="select"
                                                                className="form-control"
                                                            >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                name={`devices[return_date][${index}]`}
                                                                type="date"
                                                                className="form-control input-sm"
                                                            />
                                                        </td>



                                                        <td className="align-middle" width="100px">
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <button onClick={() => handleRemove(index)} className="btn btn-sm btn-icon btn-secondary">
                                                                    <FontAwesomeIcon icon={faTrash} /> {/* Replace the text "Xóa" with the trash icon */}
                                                                </button>
                                                            </div>
                                                        </td>


                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary ml-auto float-right">
                                            Tạo phiếu mượn
                                        </button>
                                        <button
                                            onClick={() => navigate('/devices')}
                                            className="btn btn-secondary"
                                        >
                                            Quay lại
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </LayoutMaster>
    );
    }else {
        navigate('/login');
    }
}

export default Cart;
