import { customerService } from "../service/CustomerService"
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import "../css/customer.css"

export const ListCustomer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [selectAll, setSelectAll] = useState(false);




    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);

        const checkBox = document.querySelectorAll('input[type="checkbox"]');
        checkBox.forEach((checkboxes, index) => {
            if (index !== 0) {
                checkboxes.checked = checked;
            }
        });
    };



    const handleOnExport = () => {
        let wb = XLSX.utils.book_new();
        if (customerList && customerList.length > 0) {
            var modifiedCustomerList = customerList?.map(c => ({
                ...c,
                bankAccount: c.bankAccount + "",
                fax: c.fax + "",
                customerType: c.customerType.typeName
            }))
        }
        let ws = XLSX.utils.json_to_sheet(modifiedCustomerList);
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
        XLSX.writeFile(wb, "MyExcel.xlsx")
    }

    function handleClickPage(page) {
        setCurrentPage(page.selected);

    }

    function handleChangePage(pageable) {
        if (currentPage + 1 === totalPage && pageable.isNext === true) return false;
        if (pageable.isNext === true) {
            setCurrentPage(pageable.selected + 1);
        } else {
            setCurrentPage(pageable.selected - 1);
        }
    }

    useEffect(() => {

        fetchData(0);
    }, []);

    useEffect(() => {

        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            const result = await customerService.findAllCustomer(page);
            setTotalPage(result.totalPages);
            setCustomerList(result.content);
        } catch (error) {
            console.log(error);
        }
    };
    if (!customerList) {
        return null;
    }


    return (
        <div style={{ marginTop: 10 }} >

            <div style={{ marginLeft: "80%" }}>
                <Link to="/addCustomer">
                    <button style={{ height: 35, width: "58px", backgroundColor: "#00BFFF", border: "none", borderRadius: 6 }}><i style={{ color: "white" }} class="fa fa-plus" aria-hidden="true"></i></button>

                </Link>
                <button style={{ height: 35, backgroundColor: "red", width: "58px", marginLeft: 17, border: "none", borderRadius: 6 }} ><i style={{ color: "white" }} class="fa fa-trash" aria-hidden="true"></i></button>
                <button style={{ height: 35, width: "58px", marginLeft: 17, backgroundColor: "#32CD32", border: "none", borderRadius: 6 }} onClick={handleOnExport} > <i style={{ color: "white" }} class="fa fa-cloud-download" aria-hidden="true"></i></button>
                <button style={{ height: 35, width: "58px", marginLeft: 17, border: "none", borderRadius: 6 }}><i class="fa fa-share-square" aria-hidden="true"></i></button>
            </div>

            <Formik
                initialValues={{ name: '' }}
                onSubmit={(values) => {
                    const search = async () => {
                        const result = await customerService.searchName(values.name);
                        if (result?.length === 0) {
                            // Hiển thị thông báo nếu không có kết quả
                            Swal.fire({
                                title: 'Notification!',
                                text: `No products found`,
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        }
                        setCustomerList(result);
                        fetchData()
                    };

                    search();
                }}
            >
                <Form>
                    <div className="d-flex row g-3 me-2 mt-3" style={{ marginLeft: "35%" }}>
                        <div className='col-md-6'></div>
                        <div className="col-md-5 d-flex justify-content-end">
                            <Field type="text" className="form-control" name='name' placeholder="Tìm kiếm" />
                        </div>
                        <div className="col-md-1 d-flex justify-content-right">
                            <button type='submit' style={{ backgroundColor: "#DCDCDC" }} className="btn btn-light ">
                                <i style={{ color: "#00BFFF" }} class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>

            <table
                className="table table-striped mt-3"

            >
                <thead style={{ backgroundColor: "#00BFFF", color: "white" }}>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAll} checked={selectAll} /></th>
                        <th className="content-title">Mã</th>
                        <th className="content-title">Tên</th>
                        <th className="content-title">Loại</th>
                        <th className="content-title">Địa chỉ</th>
                        <th className="content-title">Số điện thoại</th>
                        <th className="content-title">Email</th>
                        <th className="content-title">ID/Passport</th>
                    </tr>
                </thead>
                <tbody>
                    <>


                        {customerList.map((customer, index) => (
                            <tr key={index}>
                                <th><input type="checkbox" /></th>
                                <td>
                                    <Link to={`/detail/${customer.idCustomer}`}>
                                        {customer.code}
                                    </Link>
                                </td>


                                <td>{customer.name}</td>
                                <td>{customer.customerType.typeName}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.email}</td>
                                <td>{customer.passport}</td>

                            </tr>
                        ))}
                    </>
                </tbody>
            </table>

            {totalPage > 0 && (
                <div className="d-flex justify-content-center" style={{ marginLeft: "77%" }}>
                    <ReactPaginate
                        previousLabel="Trước"
                        nextLabel="Sau"
                        pageCount={totalPage}
                        onPageChange={handleClickPage}
                        onClick={handleChangePage}
                        containerClassName="pagination"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        activeClassName="active"
                        activeLinkClassName="page-link"
                        forcePage={currentPage}
                        marginPagesDisplayed={1}
                    />
                </div>
            )}


        </div>

    )
}
