/* Data base commands */
CREATE DATABASE hotelreviews;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE Users(
    userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    Name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Hotels(
    hotelid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    HotelName VARCHAR(255) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Price INT check(Price>=1 AND Price<=5)
);
CREATE TABLE Reviews(
    reviewid BIGSERIAL,
    hotelid uuid REFERENCES Hotels(hotelid) ON DELETE CASCADE,
    userid uuid REFERENCES Users(userid) ON DELETE CASCADE,
    Review VARCHAR(255),
    Rating INT check(Rating>=1 AND Rating<=5),
    name VARCHAR(255),
    PRIMARY KEY(hotelid,userid)
);
