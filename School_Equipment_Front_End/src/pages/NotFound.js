import React from 'react';

function NotFound(props) {
    return (
        <>
            <div className="wrapper">
                {/* .empty-state */}
                <div className="empty-state">
                    {/* .empty-state-container */}
                    <div className="empty-state-container">
                        <div className="state-figure">
                            <img className="img-fluid" src="assets/images/illustration/img-2.svg" alt="" style={{ maxWidth: '320px' }} />
                        </div>
                        <h3 className="state-header"> Không tìm thấy trang! </h3>
                        <p className="state-description lead text-muted"> xin lỗi, không thể tìm thấy trang này. </p>
                        <div className="state-action">
                            <a href="/" className="btn btn-lg btn-light"><i className="fa fa-angle-right" /> Quay lại</a>
                        </div>
                    </div>{/* /.empty-state-container */}
                </div>{/* /.empty-state */}
            </div>
        </>
    );
}

export default NotFound;