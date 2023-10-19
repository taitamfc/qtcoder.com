import React, { useEffect, useState } from 'react';
import LayoutMaster from '../layouts/LayoutMaster';
import BorrowModel from '../models/BorrowModel';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../includes/Breadcrumb';
import Pagination from '../includes/elements/Pagination';
import Swal from 'sweetalert2';

function Borrow(props) {
    const navigate = useNavigate();
    const [borrows, setBorrows] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [count, setCount] = useState(1);
    // Phan trang
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState({});
    // Search
    const [filter, setFilter] = useState({ user_id: user.id });

    useEffect(() => {
        BorrowModel.getAllBorrows({
            page: page,
            filter: filter
        }).then(res => {
            setBorrows(res.data);
            // Phan trang
            setPageData(res.meta);
        }).catch(err => {
            console.error('Error fetching data:', err);
        })
    }, [page, filter, count]);

    const handleChangeFilter = (event) => {
        setPage(1);
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    const handleDelete = (id) => {

        try {
            BorrowModel.destroy(id).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Xóa phiếu mượn thành công!",
                    showConfirmButton: false,
                    timer: 3000,
                });
                const randomNumber = Math.random(); // Sinh ra một số ngẫu nhiên giữa 0 và 1
                setCount(randomNumber);
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Xóa thất bại!",
                showConfirmButton: false,
                timer: 3000,
            });
        }

    }

    if (user !== null) {
        return (
            <LayoutMaster>
                <Breadcrumb page_title="Danh sách phiếu mượn" />

                <div className="page-section">
                    <div className="card card-fluid">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col">
                                    <form action="{{ route('devices.index') }}" method="GET" id="form-search" onChange={handleChangeFilter}>
                                        <div className="row">
                                            <div className="col">
                                                <label>Ngày mượn từ</label>
                                                <input
                                                    name="searchBorrowDate"
                                                    className="form-control"
                                                    type="date"
                                                    placeholder=" ngày mượn từ..."
                                                />
                                            </div>
                                            <div className="col">
                                                <label>Ngày mượn đến</label>
                                                <input
                                                    name="searchBorrowDate_to"
                                                    className="form-control"
                                                    type="date"
                                                    placeholder=" ngày mượn đến..."
                                                />
                                            </div>
                                            <div className="col">
                                                <label>Tình trạng trả</label>
                                                <select
                                                    name="searchStatus"
                                                    className="form-control"
                                                >
                                                    <option value="">-- Chọn tình trạng --</option>
                                                    <option value="1">Đã trả</option>
                                                    <option value="0">Chưa trả</option>
                                                </select>
                                            </div>

                                            <div className="col">
                                                <label>Trạng thái duyệt</label>
                                                <select
                                                    name="searchApproved"
                                                    className="form-control"
                                                >
                                                    <option value="">-- Chọn xét duyệt --</option>
                                                    <option value="0">Chưa duyệt</option>
                                                    <option value="1">Đã duyệt</option>
                                                    <option value="2">Từ chối</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Người dùng</th>
                                        <th>Ngày tạo phiếu</th>
                                        <th>Ngày mượn</th>
                                        <th>Tình trạng</th>
                                        <th>Xét duyệt</th>
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {borrows.map((borrow, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{borrow.user_name}</td>
                                            <td>{borrow.created_date_format}</td>
                                            <td>{borrow.borrow_date_format}</td>
                                            <td>{borrow.status_format} ({borrow.tong_tra}/{borrow.tong_muon})</td>
                                            <td>{borrow.approved_format}</td>

                                            {borrow.approved !== '1' && (
                                                <td>
                                                    <Link
                                                        to={`/borrows/${borrow.id}/edit`}
                                                        className="btn btn-sm btn-icon btn-secondary"
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(borrow.id)}
                                                        className="btn btn-sm btn-icon btn-secondary"
                                                    >
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination pageData={pageData} setPage={setPage} />
                    </div>
                </div>

            </LayoutMaster>
        );
    } else {
        navigate("/login");
    }
}
export default Borrow;
