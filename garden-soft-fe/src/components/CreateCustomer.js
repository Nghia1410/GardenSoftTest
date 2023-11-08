import { ErrorMessage, Field, Form, Formik } from "formik";
import { customerService } from "../service/CustomerService"
import * as Yup from "yup"
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { NavBar } from "../navbar/navbar";

export const CreateCustomer = () => {
    const navigate = useNavigate();
    const [customerCode, setCustomerCode] = useState('');
    const [customerType, setCustomerType] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    const getListCustomer = async () => {
        const listCustomerType = await customerService.findAllCustomerType();
        setCustomerType(listCustomerType);

        const listCustomers = await customerService.findAllCustomer();
        setCustomerList(listCustomers);
    };


    const generateCode = (value) => {
        let maxCode = {};

        if (value === "") {
            if (customerList && customerList.length > 0) {
                maxCode = customerList.reduce((customerCode, customer) => {
                    const matches = customer.code.match(/([A-Za-z]+)(\d+)/);
                    let cusCode = 0;

                    if (matches) {
                        cusCode = parseInt(matches[2], 10);
                    }

                    return {
                        newCode: cusCode > customerCode.newCode ? cusCode : customerCode.newCode,
                        prefix: matches[1]
                    };
                }, { newCode: 0, prefix: "" });
            } else {
                return `DT001`
            }
            return `${maxCode.prefix}${check(maxCode.newCode)}`;
        } else {
            return value;
        }
    }

    const check = (value) => {
        value += 1;
        switch (value) {
            case value < 10:
                return '000' + value;
            case value < 100:
                return '00' + value;
            case value < 1000:
                return '0' + value;
            default:
                return value;
        }
    }



    useEffect(() => {
        getListCustomer();
    }, []);



    return (
        <>
            <NavBar />
            <div className="container">
                <Formik initialValues={{
                    code: "",
                    name: "",
                    customerType: {
                        typeName: ""
                    },
                    address: "",
                    phoneNumber: "",
                    email: "",
                    passport: "",
                    fax: ""
                }
                }
                    validationSchema={Yup.object({

                        name: Yup.string()
                            .required('Không được để trống'),

                        phoneNumber: Yup.string()
                            .required('Không được để trống').min(10, 'số điện thoại phải dài ít nhất 10 số và nhiều nhất 12 số')
                            .max(12, 'số điện thoại phải dài ít nhất 10 số và nhiều nhất 12 số')


                    })}
                    onSubmit={async (values) => {

                        await customerService.createCustomer({
                            ...values,
                            bankAccount: +values.bankAccount,
                            phoneNumber: +values.phoneNumber,
                            fax: +values.fax
                        });
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm khách hàng thành công',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        navigate('/')
                    }}>

                    <Form >
                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='code'>Mã</label>
                                    <Field type='text' name='code' className='form-control' placeholder='VD:DT001' />
                                </div>

                            </div>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label><span style={{ color: "red" }}>*</span>
                                    <Field type='text' name='name' className='form-control' />
                                </div>
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name='name' component='span' className='text-bg-danger' />
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='address'>Địa chỉ</label>
                                    <Field type='text' name='address' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='phoneNumber'>Số điện thoại</label><span style={{ color: "red" }}>*</span>
                                    <Field type='text' name='phoneNumber' className='form-control' />
                                </div>
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name='phoneNumber' component='span' className='text-bg-danger' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <Field type='text' name='email' className='form-control' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='passport'>Hộ chiếu</label>
                                    <Field type='text' name='passport' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='bankAccount'>Tài khoản ngân hàng</label>
                                    <Field type='text' name='bankAccount' className='form-control' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='endDay'>Hạn thanh toán</label>
                                    <Field type='date' name='endDay' className='form-control' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='dateOfBirth'>Ngày Sinh</label>
                                    <Field type='date' name='dateOfBirth' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='dateRange'>Ngày Cấp</label>
                                    <Field type='date' name='dateRange' className='form-control' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='fax'>Fax</label>
                                    <Field type='text' name='fax' className='form-control' />
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor='bankName'>Tên ngân hàng</label>
                                    <Field type='text' name='bankName' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div className='form-group'>
                                    <label htmlFor="customerType">
                                        Loại Khách Hàng:
                                    </label>
                                    <Field as="select" id="customerType" name="customerType" className="form-control">
                                        <option value="">Chọn loại khách hàng</option><span style={{ color: "red" }}>*</span>
                                        {customerType.map((customerType, index) => (
                                            <option key={index} value={customerType.idCustomerType}>
                                                {customerType.typeName}
                                            </option>
                                        ))}
                                    </Field>
                                </div>

                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Link to='/' className='btn btn-secondary'>Thoát</Link>
                                <button className='btn btn-success' type='submit' style={{ marginLeft: '10px' }}>Lưu</button>
                            </div>
                        </div>

                    </Form>
                </Formik>
            </div >

        </>
    )
}