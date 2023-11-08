package com.example.gardensoft.controller;

import com.example.gardensoft.dto.CustomerDTO;
import com.example.gardensoft.model.Customer;
import com.example.gardensoft.model.CustomerType;
import com.example.gardensoft.service.ICustomerService;
import com.example.gardensoft.service.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;

    @GetMapping("")
    public ResponseEntity<Page<Customer>> showList(@RequestParam(value = "page", defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Customer> customerList = customerService.findAllCustomer(pageable);
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> create(@Validated @RequestBody CustomerDTO customerDTO, BindingResult bindingResult) {
        customerDTO.validate(customerDTO, bindingResult);
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        customerService.createCustomer(customerDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody List<CustomerDTO> customerDTOList) {
        customerService.saveAllCustomerByFile(customerDTOList);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchName(@RequestParam(value = "name", defaultValue = "") String name,
                                        @RequestParam(value = "page", defaultValue = "0") Integer page) {
        Page<Customer> customers = customerService.findAllByName(name, PageRequest.of(page, 5));
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/{idCustomer}")
    public ResponseEntity<?> findCustomerById(@PathVariable Integer idCustomer) {
        Customer customerList = customerService.findByIdCustomer(idCustomer);
        return new ResponseEntity<>(customerList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{idCustomer}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer idCustomer) {
        customerService.deleteCustomer(idCustomer);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
