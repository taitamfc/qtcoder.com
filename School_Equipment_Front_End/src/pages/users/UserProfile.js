import React, { useEffect, useState } from "react";
import LayoutMaster from "../../layouts/LayoutMaster";
import UserModel from "../../models/UserModel";
import { Link, useNavigate, useParams } from "react-router-dom";
import GroupModel from "../../models/GroupModel";
import NestModel from "../../models/NestModel";
import { format } from "date-fns";

function UserProfile(props) {
  const [acc1, setAcc1] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [acc, setAcc] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserModel.find(acc1.id);
        const data = response.data;
        setAcc(data);
        setDataLoaded(true); // Đánh dấu rằng dữ liệu đã được tải
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // //console.log(acc);
  const [groups, setGroups] = useState([]);
  const [nests, setNests] = useState([]);
  const getGroupNameById = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    return group ? group.name : "";
  };

  const getNestNameById = (nestId) => {
    const nest = nests.find((nest) => nest.id === nestId);
    return nest ? nest.name : "";
  };

  useEffect(() => {
    GroupModel.all()
      .then((res) => {
        setGroups(res);
        // //console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    NestModel.all()
      .then((res) => {
        setNests(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  if (acc1 !== null) {
    return (
      <LayoutMaster>
        <>
          <header className="page-title-bar">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active"></li>
              </ol>
            </nav>
            <div className="d-md-flex align-items-md-start">
              <h1 className="page-title mr-sm-auto">Tài khoản : </h1>
            </div>
          </header>
          <div className="page-section">
            <div className="row">
              <div className="col-lg-4">
                <div className="card card-fluid">
                  <h6 className="card-header"> Hồ sơ </h6>
                  <nav className="nav nav-tabs flex-column border-0">
                    <Link href="" className="nav-link">
                      Thông tin
                    </Link>
                    <Link to="/users/update-profile" className="nav-link">
                      Cập nhật tài khoản
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card card-fluid">
                  <h6 className="card-header"> Hồ sơ công khai </h6>
                  <div className="card-body">
                    <form method="post">
                      <div className="form-row">
                        <label htmlFor="input01" className="col-md-3">
                          Tên giáo viên :
                        </label>
                        <div className="col-md-9 mb-3">
                          <div className="custom-file">
                            <p>{acc.name}</p>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input02" className="col-md-3">
                          E-mail :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{acc.email}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input03" className="col-md-3">
                          Số điện thoại :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{acc.phone}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input04" className="col-md-3">
                          Địa chỉ :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{acc.address}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input04" className="col-md-3">
                          Giới tính :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{acc.gender}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input04" className="col-md-3">
                          Ngày sinh :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>
                            {dataLoaded &&
                              format(new Date(acc.birthday), "dd/MM/yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input04" className="col-md-3">
                          Chức vụ :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{getGroupNameById(acc.group_id)}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <label htmlFor="input04" className="col-md-3">
                          Tổ :
                        </label>
                        <div className="col-md-9 mb-3">
                          <p>{getNestNameById(acc.nest_id)}</p>
                        </div>
                      </div>
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </LayoutMaster>
    );
  } else {
    navigate("/login");
  }
}

export default UserProfile;
