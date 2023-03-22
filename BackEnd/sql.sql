SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[User_Account_CreateOrUpdate_AdminWeb] 
        @id BIGINT = NULL,
        @username  BIGINT = NULL,
        @password  nvarchar(500) = NULL,
        @is_active bit = 1,
        @is_delete bit = 0,
		@first_name nvarchar(500),
        @SERVICEID  INT = 53322,
        @ISCOD  INT = 1,
        @NOTE NVARCHAR(255) = '',
        @REQUIRENOTE VARCHAR(250) = 'KHONGCHOXEMHANG' ,
        @SHIPPINGSTATUS VARCHAR(250) = NULL,
        @SHIPPINGFEETOTAL VARCHAR(250) = '192500',
        @CREATEDUSER  NVARCHAR ( 250 ) = NULL,
        @ISACTIVE AS INT = NULL ,
        @SERVICENAME NVARCHAR (250) = NULL,
        @SERVICETYPEID INT = NULL,
        @STOREID INT = NULL
AS 
BEGIN
	IF NOT EXISTS ( SELECT TOP 1 1 FROM SL_SHIPPING WITH ( NOLOCK ) WHERE ORDERID = @ORDERID AND  ORDERPACKINGID = @ORDERPACKINGID ) 
        BEGIN
                INSERT INTO SL_SHIPPING (
                    ORDERID,
                    ORDERPACKINGID,
                    SHIPPINGUNITID,
                    SERVICEID,
                    ISCOD,
                    REQUIRENOTE,
                    SHIPPINGSTATUS,
                    SHIPPINGFEETOTAL,
                    CREATEDUSER,
                    CREATEDDATE,
                    ISACTIVE,
                    ISDELETED,
                    SERVICENAME,
                    SERVICETYPEID,
                    NOTE,
                    STOREID,
                    TRANSFERPERSON
                )
            VALUES
                (
                    @ORDERID,
                    @ORDERPACKINGID,
                    @SHIPPINGUNITID,
                    @SERVICEID,
                    @ISCOD,
                    @REQUIRENOTE,
                    @SHIPPINGSTATUS,
                    @SHIPPINGFEETOTAL,
                    @CREATEDUSER,
                    GETDATE( ),
                    1,
                    0 ,
                    @SERVICENAME,
                    @SERVICETYPEID,
                    @NOTE,
                    @STOREID,
                    @CREATEDUSER
                ) 
                SET @SHIPPINGID = SCOPE_IDENTITY( ) 
                SELECT @SHIPPINGID AS RESULT 
        END 
    ELSE
        BEGIN
            SELECT   
                    @SHIPPINGID = SHIPPINGID
                    
            FROM    SL_SHIPPING
            WHERE   ORDERID = @ORDERID 
            AND     ORDERPACKINGID = @ORDERPACKINGID

            UPDATE  SL_SHIPPING
            SET     
                    SERVICEID = @SERVICEID,
                    SERVICENAME = @SERVICENAME,
                    SHIPPINGUNITID = @SHIPPINGUNITID,
                    ISCOD = @ISCOD,
                    NOTE = @NOTE,
                    STOREID = @STOREID,
                    SHIPPINGFEETOTAL = @SHIPPINGFEETOTAL,
                    SERVICETYPEID = @SERVICETYPEID,
                    REQUIRENOTE = @REQUIRENOTE,
                    SHIPPINGSTATUS = @SHIPPINGSTATUS,
                    ISDELETED = 0,
                    TRANSFERPERSON = @CREATEDUSER
            WHERE   SHIPPINGID = @SHIPPINGID

            SELECT @SHIPPINGID AS RESULT
            

		-- 	UPDATE MD_SHIFT 
		-- 	SET SHIFTNAME =@SHIFTNAME,
		-- 	DESCRIPTION =@DESCRIPTION,
		-- 	HOURSTART =@HOURSTART,
		-- 	MINUTESTART =@MINUTESTART,
		-- 	HOUREND =@HOUREND,
		-- 	MINUTEEND =@MINUTEEND,
		-- 	SHIFTCODE =@SHIFTCODE,
		-- 	NUMBEROFWORKDAY =@NUMBEROFWORKDAY,
		-- 	HOURBREAKSTART =@HOURBREAKSTART,
		-- 	MINUTEBREAKSTART =@MINUTEBREAKSTART,
		-- 	HOURBREAKEND =@HOURBREAKEND,
		-- 	MINUTEBREAKEND =@MINUTEBREAKEND,
		-- 	ISOVERTIME =@ISOVERTIME,
		-- 	HOURCHECKIN =@HOURCHECKIN,
		-- 	MINUTECHECKIN =@MINUTECHECKIN,
		-- 	HOURCHECKOUT =@HOURCHECKOUT,
		-- 	MINUTECHECKOUT =@MINUTECHECKOUT,
		-- 	MINUTECHECKINLATE =@MINUTECHECKINLATE,
		-- 	MINUTECHECKOUTEARLY =@MINUTECHECKOUTEARLY,
		-- 	ISAPPLYALLDAY =@ISAPPLYALLDAY,
		-- 	ISAPPLYMONDAY =@ISAPPLYMONDAY,
		-- 	ISAPPLYTUESDAY =@ISAPPLYTUESDAY,
		-- 	ISAPPLYWEDNESDAY =@ISAPPLYWEDNESDAY,
		-- 	ISAPPLYTHURSDAY =@ISAPPLYTHURSDAY,
		-- 	ISAPPLYFRIDAY =@ISAPPLYFRIDAY,
		-- 	ISAPPLYSATURDAY =@ISAPPLYSATURDAY,
		-- 	ISAPPLYSUNDAY =@ISAPPLYSUNDAY,
		-- 	SHIFTTIME =@SHIFTTIME,
		-- 	UPDATEDUSER =@CREATEDUSER,
		-- 	UPDATEDDATE = GETDATE( ) 
		-- WHERE
		-- 	SHIFTID =@SHIFTID 
		-- 	SELECT @SHIFTID AS RESULT 
	END 
END
GO
