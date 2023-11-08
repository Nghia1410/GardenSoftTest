package com.example.gardensoft.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomerType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCustomerType;
    private String typeName;

    public CustomerType() {
    }

    public CustomerType(Integer idCustomerType) {
        this.idCustomerType = idCustomerType;
    }

    public Integer getIdCustomerType() {
        return idCustomerType;
    }

    public String getTypeName() {
        return typeName;
    }
}
