

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aad653_hotelzapse SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aad653_hotelzapse COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aad653_hotelzapse SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO


create table djelatnici(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar (50) not null,
brojzaduzenja int,
);

create table psi(
sifra int not null primary key identity(1,1),
ime varchar(50),
oznaka varchar(50) not null,
sifraboksa int not null,
datumdolaska datetime not null,
datumodlaska datetime,
korisnici int not null,
djelatnici int not null
);


Create table korisnici(
sifra int not null primary key identity(1,1),
ime varchar (50) not null,
prezime varchar (50) not null,
brojtelefona varchar(50) not null
);

alter table psi add foreign key (korisnici) references korisnici(sifra);
alter table psi add foreign key (djelatnici) references djelatnici(sifra);
ALTER TABLE korisnici  
--
ADD CONSTRAINT uc1 UNIQUE (brojtelefona);
delete from korisnici;

-- 1 - 4
insert into korisnici(ime,prezime,brojtelefona) values
('Marko','Matiæ','091/5689-663'),
('Karla','Matiæ','091/5683-663'),
('Ðuro','Matiæ','091/5682-663'),
('Katica','Matiæ','091/5688-663');


select * from korisnici;
-- 1 - 4
insert into djelatnici(ime,prezime) values
('Ana','Katiæ'),
('Marta','Katiæ'),
('Željana','Katiæ'),
('Emina','Katiæ');

insert into psi (sifraboksa,datumdolaska,korisnici,djelatnici,
ime, oznaka)
values
(1,'2024-06-15',3,1,null,'2024/12'),
(1,'2024-06-15',2,1,'Fifi','2024/18');