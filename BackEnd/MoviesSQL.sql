CREATE TABLE Movies (
    movie_id int  identity(1,1) Primary key,
    movie_name nvarchar(500),
    movie_description nvarchar(500),
    movie_trailer nvarchar(500),
    moive_cens nvarchar(500),
    genres_id bigint,
    movie_lenght time,
    movie_format nvarchar(500),
    movie_poster nvarchar(500),
    create_date datetime,
    update_date datetime,
    delete_date datetime,
    is_active bit,
    is_delete bit,
    is_review bit
)

CREATE TABLE Genres(
    genres_id int identity(1,1) PRIMARY KEY,
    genres_name nvarchar(500),
    create_date datetime,
    is_active bit,
    is_delete bit,
    delete_date datetime,
    update_date datetime 
)

CREATE TABLE Booking(
    booking_id int Identity(1,1) PRIMARY KEY,
    user_id bigint,
    schedule_id int,
    seat_id int,
    price money,
    seat_status int,
    is_active bit,
    is_delete bit,
    create_date datetime,
    delete_date datetime,
    update_date datetime,
    payment_type int 
)

CREATE TABLE Seats(
    seat_id bigint Identity(1,1) PRIMARY KEY,
    seat_type_id bigint,
    room_id bigint,
    row varchar(500),
    number_seat int,
    is_active bit,
    is_delete bit,
    create_date datetime,
    delete_date datetime,
    update_date datetime,
)

CREATE TABLE SeatsTypeId (
    seat_type_id bigint Identity(1,1) PRIMARY KEY,
    seat_type_name nvarchar(500),
    is_active bit,
    is_delete bit,
    create_date datetime,
    delete_date datetime,
    update_date datetime,
)

CREATE TABLE Schedule(
    schedule_id bigint Identity(1,1) PRIMARY KEY,
    movie_id bigint,
    room_id bigint,
    scheduleTime_start datetime,
    scheduleTime_end datetime,
    create_date datetime,
    update_date datetime,
    delete_date datetime,
    is_active bit,
    is_delete bit,
    is_review bit,
)

CREATE TABLE Room(
    room_id bigint Identity(1,1) primary key,
    room_name nvarchar(500),
    cinema_id bigint,
    room_type bigint,
    is_active bit,
    is_delete bit,
    is_review bit,
    create_date datetime,
    delete_date datetime,
    update_date datetime,
)

CREATE TABLE RoomType(
    room_type_id bigint Identity(1,1) primary key,
    room_type_name nvarchar(500),
    is_active bit,
    is_delete bit,
    create_date datetime,
    update_date datetime,
    delete_date datetime,
)


CREATE TABLE Cinemas(
    cinema_id bigint Identity(1,1) Primary key,
    cinema_type_id bigint,
    cinema_name nvarchar(max),
    cinema_address nvarchar(max),
    district_code nvarchar(1000) ,
	province_code nvarchar(1000),
	ward_code nvarchar(1000),
    is_active bit,
    is_delete bit,
    is_review bit,
    create_date datetime,
    update_date datetime,
    delete_date datetime
)

CREATE TABLE CinemaTypeId(
    cinema_type_id bigint Identity(1,1) PRIMARY KEY,
    cinema_type_name nvarchar(500),
    is_active bit,
    is_delete bit,
    is_review bit,
    create_date datetime,
    update_date datetime,
    delete_date datetime,
)
