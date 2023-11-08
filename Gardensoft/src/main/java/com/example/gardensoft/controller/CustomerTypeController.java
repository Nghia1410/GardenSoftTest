package com.example.gardensoft.controller;

import com.example.gardensoft.model.CustomerType;
import com.example.gardensoft.service.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CustomerTypeController {
    @Autowired
    private ICustomerTypeService customerTypeService;

    @GetMapping("/customerType")
    public ResponseEntity<?> showListCustomerType() {
        List<CustomerType> customerTypeList = customerTypeService.findAllCustomerType();
        return new ResponseEntity<>(customerTypeList, HttpStatus.OK);
    }
}
