package com.example.gardensoft.repository;

import com.example.gardensoft.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface ICustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "select * from customer", nativeQuery = true)
    Page<Customer> showListCustomer(Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "EXEC create_customer @address = :address ,@bank_account = :bank_account,@bank_name = :bank_name,@code =:code,@date_of_birth = :date_of_birth,@date_range= :date_range,@email = :email ,@end_day = :end_day ,@fax=:fax ,@name =:name,@passport = :passport,@phone_number = :phone_number,@customer_type= :customer_type", nativeQuery = true)
    void createCustomer(@Param("address") String address,
                        @Param("bank_account") Long bankAccount,
                        @Param("bank_name") String bank_name,
                        @Param("code") String code,
                        @Param("date_of_birth") LocalDate date_of_birth,
                        @Param("date_range") LocalDate date_range,
                        @Param("email") String email,
                        @Param("end_day") LocalDate end_day,
                        @Param("fax") Long fax,
                        @Param("name") String name,
                        @Param("passport") String passport,
                        @Param("phone_number") Long phone_number,
                        @Param("customer_type") Integer customer_type
    );

    @Query(value = "select * from customer where name like concat('%',:name,'%')", nativeQuery = true)
    Page<Customer> findAllName(@Param("name") String name, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM Customer c WHERE c.idCustomer = :idCustomer")
    void deleteCustomer(@Param("idCustomer") Integer idCustomer);

}
