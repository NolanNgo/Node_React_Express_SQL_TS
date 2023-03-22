CREATE TABLE [dbo].[User_Account](
	[id] [bigint] IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[password] [nvarchar](1000) NOT NULL,
	[username] [nvarchar](1000) NOT NULL,
	[google_id] [nvarchar](1000) NULL,
	[is_active] [bit] NOT NULL,
	[is_delete] [bit] NOT NULL,
	[create_date] [datetime2](7) NOT NULL,
	[user_type_id] [bigint] NOT NULL,
	[address] [nvarchar](1000) NULL,
	[age] [int] NULL,
	[avartar] [nvarchar](1000) NULL,
	[email] [nvarchar](1000) NOT NULL,
	[first_name] [nvarchar](1000) NULL,
	[full_name] [nvarchar](1000) NULL,
	[gender] [int] NULL,
	[last_name] [nvarchar](1000) NULL,
	[logo] [nvarchar](1000) NULL,
	[number_phone] [nvarchar](1000) NULL,
	[district_code] [nvarchar](1000) NULL,
	[province_code] [nvarchar](1000) NULL,
	[ward_code] [nvarchar](1000) NULL,
	[birthday] [nvarchar](1000) NULL,
	[description] [nvarchar](max) NULL,
	[birthday_month] [nvarchar](1000) NULL,
	[birthday_year] [nvarchar](1000) NULL
) 