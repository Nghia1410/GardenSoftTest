import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { customerService } from "../service/CustomerService"
import { Link } from "react-router-dom";


export function DetailCustomer() {
    const param = useParams();
    const [customerDetail, setCustomerDetail] = useState('');

    const getCustomerId = async () => {
        const customerId = await customerService.findByIdCustomer(param.idCustomer);
        setCustomerDetail(customerId);

    };
    useEffect(() => {
        getCustomerId();
    }, [param.idCustomer]);
    return (
        <>


            <div style={{ marginLeft: "80%", marginTop: 10, marginBottom: 20 }}>
                <Link to="/addCustomer">
                    <button style={{ height: 35, width: "58px", backgroundColor: "#00BFFF", border: "none", borderRadius: 6 }}><i style={{ color: "white" }} class="fa fa-plus" aria-hidden="true"></i></button>

                </Link>
                <button style={{ height: 35, backgroundColor: "red", width: "58px", marginLeft: 17, border: "none", borderRadius: 6 }} ><i style={{ color: "white" }} class="fa fa-trash" aria-hidden="true"></i></button>
                <button style={{ height: 35, width: "58px", marginLeft: 17, backgroundColor: "#32CD32", border: "none", borderRadius: 6 }} > <i style={{ color: "white" }} class="fa fa-cloud-download" aria-hidden="true"></i></button>
                <button style={{ height: 35, width: "58px", marginLeft: 17, border: "none", borderRadius: 6 }}><i class="fa fa-share-square" aria-hidden="true"></i></button>
            </div>
            <h1 style={{ textAlign: "center", }}>Chi Tiết Khách Hàng</h1>
            <table className="table table-striped">

                <tbody>
                    <tr>
                        <th>Mã: </th>
                        <th>{customerDetail.code}</th>
                    </tr>
                    <tr>
                        <th>Tên: </th>
                        <th>{customerDetail.name}</th>
                    </tr>
                    <tr>
                        <th>Địa chỉ: </th>
                        <th>{customerDetail.address}</th>
                    </tr>
                    <tr>
                        <th>Passport: </th>
                        <th>{customerDetail.passport}</th>
                    </tr>
                    <tr>
                        <th>Số điện thoại: </th>
                        <th>{customerDetail.phoneNumber}</th>
                    </tr>
                    <tr>
                        <th>Email: </th>
                        <th>{customerDetail.email}</th>
                    </tr>
                    <tr>
                        <th>Hạn Thanh Toán: </th>
                        <th>{customerDetail.endDay}</th>
                    </tr>
                    <tr>
                        <th>Ngày Sinh: </th>
                        <th>{customerDetail.dateOfBirth}</th>
                    </tr>
                    <tr>
                        <th>Fax: </th>
                        <th>{customerDetail.fax}</th>
                    </tr>
                    <tr>
                        <th>Tên Ngân Hàng: </th>
                        <th>{customerDetail.bankName}</th>
                    </tr>
                    <tr>
                        <th>Tài Khoản Ngân Hàng: </th>
                        <th>{customerDetail.bankAccount}</th>
                    </tr>
                    <tr>
                        <th>Ngày Cấp: </th>
                        <th>{customerDetail.dateRange}</th>
                    </tr>
                </tbody>
            </table>
            <Link to="/">
            <button className="btn btn-primary mt-3">Thoát</button>
            </Link>
        </>
    )
}