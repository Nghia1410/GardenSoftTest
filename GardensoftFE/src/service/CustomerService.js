import axios from "axios";
import { date } from "yup";

const findAllCustomer = async (page) => {
    try {
        const res = await axios.get(`http://localhost:8080/?page=${page}`)
        return res.data
    } catch (error) {
        console.log(error);
    }

}

const findAllCustomerType = async () => {
    const res = await axios.get(`http://localhost:8080/customerType`)
    return res.data
}

const createCustomerByFile = async (customerList) => {
    try {
        await axios.post(`http://localhost:8080/addCustomer`, customerList)
    } catch (e) {
        console.log(e)
    }
}

const createCustomer = async (customer) => {
    console.log(customer);
    await axios.post(`http://localhost:8080/add`, customer)
}

const searchName = async (name) => {
    try {
        let rs = await axios.get(`http://localhost:8080/search?name=${name}`)
        return rs.data.content
    } catch (e) {
        console.log(e)
    }
}

const findByIdCustomer = async (idCustomer) => {
    return (await axios.get(`http://localhost:8080/${idCustomer}`)).data
}

const deleteCustomer = async (idCustomer) => {
    await axios.delete(`http://localhost:8080/delete/${idCustomer}`)
}
export const customerService = {
    findAllCustomer,
    createCustomer,
    findAllCustomerType,
    createCustomerByFile,
    searchName,
    deleteCustomer,
    findByIdCustomer
}