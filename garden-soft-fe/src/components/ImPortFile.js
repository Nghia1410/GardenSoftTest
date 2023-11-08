
import { customerService } from "../service/CustomerService"
import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { NavBar } from "../navbar/navbar";
import { Link } from "react-router-dom";

export function ImPortFile() {

    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [type, setType] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllType = async () => {
            let rs = await customerService.findAllCustomerType();
            setType(rs);
        }
        getAllType()
    }, [])

    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            if (type && type.length > 0) {
                await customerService.createCustomerByFile(
                    data.slice(0, 5).map((tc) => ({
                        ...tc,
                        idCustomer: null,
                        customerType: type.find(cus => cus.typeName === tc.customerType)
                    }))
                )
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm khách hàng thành công',
                    showConfirmButton: false,
                    timer: 1000
                })
                navigate('/')
            }
        }
    }

    return (
        <>
            <div>
                <NavBar /><br />
                <Formik>
                    <Form className="form-group" onSubmit={handleFileSubmit}>
                        <div className='d-flex justify-content-around'>
                          
                                <Field type="file" style={{ width: "80%" }} className="form-control" required onChange={handleFile} />
                                <button type="submit" style={{ width: "18%" }} className="btn btn-secondary btn-md">UPLOAD</button>
                         
                        </div>
                        {typeError && (
                            <div className="alert alert-danger" role="alert">{typeError}</div>
                        )}
                        <Link to="/">
                        <div style={{textAlign:"center"}}>
                              <button className="btn btn-primary mt-5" >Thoát</button>

                        </div>
                        </Link>
                        
                    </Form>
                  
                </Formik>
            </div>

        </>

    );
}
