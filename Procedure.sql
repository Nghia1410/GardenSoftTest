USE [gardensoft]
GO

/****** Object:  StoredProcedure [dbo].[create_customer]    Script Date: 11/7/2023 10:55:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[create_customer] @address ntext ,@bank_account bigint,@bank_name nvarchar(255),@code varchar(10),@date_of_birth date,@date_range date,@email varchar(255),@end_day date,@fax bigint,@name nvarchar(255),@passport bigint,@phone_number bigint,@customer_type int as
insert into customer(address,bank_account,bank_name,code,date_of_birth,date_range,email,end_day,fax,name,passport,phone_number,customer_type)values (@address,@bank_account,@bank_name,@code,@date_of_birth,@date_range,@email,@end_day,@fax,@name,@passport,@phone_number,@customer_type)
GO


