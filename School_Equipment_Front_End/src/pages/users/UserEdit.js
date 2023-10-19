
import { Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import UserModel from "../../models/UserModel";
import LayoutMaster from "../../layouts/LayoutMaster";
import GroupModel from "../../models/GroupModel";
import NestModel from "../../models/NestModel";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Không được để trống !"),
  email: Yup.string().required("Không được để trống !"),
  address: Yup.string().required("Không được để trống !"),
  phone: Yup.string().required("Không được để trống !"),
  gender: Yup.string().required("Không được để trống !"),
  birthday: Yup.string().required("Không được để trống !"),
  group_id: Yup.string().required("Không được để trống !"),
  nest_id: Yup.string().required("Không được để trống !"),
});


function UserEdit(props) {
  
  const [acc, setAcc] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    birthday: "",
    group_id: "",
    nest_id: "",
    password: "",
  });
  const [groups, setGroups] = useState([]);
  const [nests, setNests] = useState([]);
  useEffect(() => {
    // //console.log(acc1.id);
    UserModel.find(acc.id)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [acc]);

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

  
    const handleSubmit = (data) => {
      UserModel.update(acc.id, data)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          //console.log(res);
          navigate("/users/profile");
        })
        .catch((err) => {
          console.error("Lỗi khi sửa :", err);
        });
    };
    // //console.log(form);
  
    if (acc !== null) {
    return (
      <LayoutMaster>
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
                  <Link to="/users/profile" className="nav-link">
                    Thông tin
                  </Link>
                  <Link to="" className="nav-link">
                    Cập nhật tài khoản
                  </Link>
                </nav>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card card-fluid">
                <h6 className="card-header"> Hồ sơ công khai </h6>
                <div className="card-body">
                    <Formik
                      initialValues={form}
                      validationSchema={validationSchema}
                      onSubmit={(values) => handleSubmit(values)}
                      enableReinitialize={true}
                    >
                      {({ errors, touched }) => (
                        <Form enctype="multipart/form-data">
                          <legend>Thông tin cơ bản</legend>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">
                                  Tên giáo viên
                                </label>{" "}
                                <Field
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Nhập tên giáo viên"
                                />
                                <small className="form-text text-muted" />
                                {errors.name && touched.name ? (
                                  <div>{errors.name}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">
                                  E-mail
                                </label>{" "}
                                <Field
                                  type="text"
                                  name="email"
                                  className="form-control"
                                  placeholder="Nhập email"
                                />
                                <small className="form-text text-muted" />
                                {errors.email && touched.email ? (
                                  <div>{errors.email}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Giới tính</label>{" "}
                                <Field
                                  as="select"
                                  name="gender"
                                  className="form-control"
                                >
                                  <option value="">Chọn giới tính</option>
                                  <option value="Nam">Nam</option>
                                  <option value="Nữ">Nữ</option>
                                </Field>
                                <small className="form-text text-muted" />
                                {errors.gender && touched.gender ? (
                                  <div>{errors.gender}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Ngày sinh</label>{" "}
                                <Field
                                  type="date"
                                  name="birthday"
                                  className="form-control"
                                  placeholder="Nhập ngày sinh"
                                />
                                <small className="form-text text-muted" />
                                {errors.birthday && touched.birthday ? (
                                  <div>{errors.birthday}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Số điện thoại</label>{" "}
                                <Field
                                  type="number"
                                  name="phone"
                                  className="form-control"
                                  placeholder="Nhập số điện thoai"
                                />
                                <small className="form-text text-muted" />
                                {errors.phone && touched.phone ? (
                                  <div>{errors.phone}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Mật khẩu</label>{" "}
                                <Field
                                  type="password" // Sử dụng type="password" để ẩn mật khẩu
                                  name="password"
                                  className="form-control"
                                  placeholder="Để trống nếu không thay đổi"
                                  autoComplete="new-password"
                                />
                                <small className="form-text text-muted" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Chức vụ</label>
                                <Field
                                  as="select"
                                  name="group_id"
                                  className="form-control"
                                  disabled
                                >
                                  {groups.map((group) => (
                                    <option
                                      key={group.id}
                                      value={group.id}
                                      selected={form.group_id === group.id}
                                    >
                                      {group.name}
                                    </option>
                                  ))}
                                </Field>

                                <small className="form-text text-muted" />
                                {errors.group_id && touched.group_id ? (
                                  <div>{errors.group_id}</div>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="tf1">Tổ</label>
                                <Field
                                  as="select"
                                  name="nest_id"
                                  className="form-control"
                                >
                                  {nests.map((nest) => (
                                    <option
                                      key={nest.id}
                                      value={nest.id}
                                      selected={form.nest_id === nest.id}
                                    >
                                      {nest.name}
                                    </option>
                                  ))}
                                </Field>
                                <small className="form-text text-muted" />
                                {errors.nest_id && touched.nest_id ? (
                                  <div>{errors.nest_id}</div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="tf1">Địa chỉ</label>{" "}
                            <Field
                              type="text"
                              name="address"
                              className="form-control"
                              placeholder="Nhập địa chỉ"
                            />
                            <small className="form-text text-muted" />
                            {errors.address && touched.address ? (
                              <div>{errors.address}</div>
                            ) : null}
                          </div>
                          <div className="form-actions">
                            <Link
                              className="btn btn-secondary float-right"
                              to={"/users/profile"}
                            >
                              Hủy
                            </Link>
                            <button
                              className="btn btn-primary ml-auto"
                              type="submit"
                            >
                              Cập nhật
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMaster>
    );
    }else{
      navigate('/login')
    } 
}

export default UserEdit;
