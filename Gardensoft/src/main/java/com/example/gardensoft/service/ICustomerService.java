package com.example.gardensoft.service;


import com.example.gardensoft.dto.CustomerDTO;
import com.example.gardensoft.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICustomerService  {
    Page<Customer> findAllCustomer(Pageable pageable);
    void saveAllCustomerByFile(List<CustomerDTO> customerDTOList);
    Page<Customer> findAllByName(String name, Pageable pageable);
    void createCustomer(CustomerDTO customerDTO);
    void deleteCustomer(Integer idCustomer);
    Customer findByIdCustomer(Integer idCustomer);
}