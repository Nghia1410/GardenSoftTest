package com.example.gardensoft.service.impl;

import com.example.gardensoft.dto.CustomerDTO;
import com.example.gardensoft.model.Customer;
import com.example.gardensoft.repository.ICustomerRepository;
import com.example.gardensoft.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository customerRepository;

    @Override
    public Page<Customer> findAllCustomer(Pageable pageable) {
        Pageable validPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return customerRepository.showListCustomer(validPageable);
    }

    @Override
    public void saveAllCustomerByFile(List<CustomerDTO> customerDTOList) {
        for (int i = 0; i < customerDTOList.size(); i++) {
            this.createCustomer(customerDTOList.get(i));
        }
    }

    @Override
    public Page<Customer> findAllByName(String name, Pageable pageable) {
        return customerRepository.findAllName(name, pageable);
    }

    @Override
    public void createCustomer(CustomerDTO customerDTO) {
        customerRepository.createCustomer(customerDTO.getAddress(), customerDTO.getBankAccount(), customerDTO.getBankName(),
                customerDTO.getCode(), customerDTO.getDateOfBirth(), customerDTO.getDateRange(), customerDTO.getEmail(), customerDTO.getEndDay(), customerDTO.getFax(),
                customerDTO.getName(), customerDTO.getPassport(), customerDTO.getPhoneNumber(), customerDTO.getCustomerType().getIdCustomerType());
    }

    @Override
    public void deleteCustomer(Integer idCustomer) {
        customerRepository.deleteCustomer(idCustomer);
    }

    @Override
    public Customer findByIdCustomer(Integer idCustomer) {
        return customerRepository.findById(idCustomer).get();
    }

}
