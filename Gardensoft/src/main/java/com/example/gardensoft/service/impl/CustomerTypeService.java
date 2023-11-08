package com.example.gardensoft.service.impl;

import com.example.gardensoft.model.CustomerType;
import com.example.gardensoft.repository.ICustomerTypeRepository;
import com.example.gardensoft.service.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CustomerTypeService implements ICustomerTypeService {
    @Autowired
    private ICustomerTypeRepository customerTypeRepository;
    @Override
    public List<CustomerType> findAllCustomerType() {
        return customerTypeRepository.findAll();
    }
}
