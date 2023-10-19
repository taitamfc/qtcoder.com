import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BorrowModel from '../models/BorrowModel';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import RoomModel from '../models/RoomModel';
import Swal from 'sweetalert2';
import DeviceModel from '../models/DeviceModel';

const EditSchema = Yup.object().shape({
    borrow_date: Yup.string().required('Vui lòng nhập ngày mượn!'),
});

function EditBorrow() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem('user')));
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
    const [devices, setDevices] = useState([]);
    const [the_devices, setThe_devices] = useState([]);

    const [rooms, setRooms] = useState([]);
    const [createdAt, setCreatedAt] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const [linkImageDevice, setLinkImageDevice] = useState([]);
    useEffect(() => {
        DeviceModel.getAllDevices().then((res) => {
            const newLinkImageDevice = res.data.reduce((acc, element) => {
                acc[element.id] = element.url_image;
                return acc;
            }, {});
            setLinkImageDevice(newLinkImageDevice);
        });
    }, []);
    


    useEffect(() => {
        BorrowModel.find(id)
            .then((res) => {
                setDevices(res.data.devices);
                let emptyDevice = [];
                let emptyLessons = [];
                let emptyQuantity = [];
                let emptySession = [];
                let emptyLecture = [];
                let emptyRoom = [];
                let emptyLectureNumber = [];
                let emptyReturn = [];
    
                for (let i = 0; i < res.data.the_devices.length; i++) {
                    emptyDevice.push(res.data.the_devices[i].device_id)
                    emptyLessons.push(res.data.the_devices[i].lesson_name)
                    emptyQuantity.push(res.data.the_devices[i].quantity)
                    emptySession.push(res.data.the_devices[i].session)
                    emptyLecture.push(res.data.the_devices[i].lecture_name)
                    emptyRoom.push(res.data.the_devices[i].room_id)
                    emptyLectureNumber.push(res.data.the_devices[i].lecture_number)
                    emptyReturn.push(res.data.the_devices[i].return_date)
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
    
                // Kiểm tra xem formData đã tồn tại trước khi ghi đè lên nó
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    borrow_date: res.data.borrow_date,
                    borrow_note: res.data.borrow_note,
                    devices: new_devices,
                    user_id: res.data.user_id,
                    status: 0,
                    approved: 0,
                    created_at: res.data.created_at
                }));
            })
            .catch((error) => {
                console.error('Error fetching borrow data:', error);
            });
    }, []);
    

    useEffect(() => {
        // Lấy ngày hiện tại và định dạng thành chuỗi yyyy-MM-ddTHH:mm để điền vào trường "Ngày tạo phiếu"
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd/MM/yyyy");
        setCreatedAt(formattedDate);

        RoomModel.getRoom()
            .then((res) => {
                setRooms(res);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });

        // Lấy dữ liệu phiếu mượn cần chỉnh sửa

    }, [id]);

    const handleSubmit = (formData) => {
        try{
            BorrowModel.update(id,formData).then(()=>{
                
                Swal.fire({
                    icon: "success",
                    title: "Cập nhật phiếu mượn thành công!",
                    showConfirmButton: false,
                    timer: 3000,
                });
            })
        }catch{
            Swal.fire({
                icon: 'error',
                title: 'Cập nhật phiếu mượn thất bại!',
                showConfirmButton: false,
                timer: 3000,
              });
        }
    }

    if (acc1 !== null) {
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
                    <h1 className="page-title mr-sm-auto"> Chỉnh Sửa Phiếu Mượn</h1>
                </div>
            </header>

            <Formik
                initialValues={formData}
                validationSchema={EditSchema}
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
                                            <p className='form-control-static'>{acc1 ? acc1.name : ''}</p>
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
                                            {/* {//console.log(formData)} */}
                                            {errors.borrow_date && touched.borrow_date && (
                                                <div style={{ color: 'red' }}>{formData.borrow_date}</div>
                                            )}
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
                                </div>
                            </div>
                        </div>

                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-body">
                                    <legend>Chi tiết phiếu mượn</legend>
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {devices.map((item, index) => (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td className="device-cell">
                                                            <Link
                                                                to={`/devices/${item.id}`}
                                                                className="tile tile-img mr-1"
                                                            >
                                                                <img
                                                                    className="img-fluid"
                                                                    src={linkImageDevice[item.id]}
                                                                    alt=""
                                                                />
                                                            </Link>
                                                            <span>
                                                                {item.name || 'Tên không tồn tại'}
                                                            </span>
                                                        </td>
                                                        <td width="100">
                                                            <Field
                                                                name= {`devices[quantity][${index}]`}
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


                                                    </tr>
                                            ))}   
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary ml-auto float-right">
                                            Cập nhật phiếu mượn
                                        </button>
                                        <Link to="/borrows" className="btn btn-secondary">
                                            Quay lại
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </LayoutMaster>
    );
    } else {
    navigate("/login");
    }
}

export default EditBorrow;