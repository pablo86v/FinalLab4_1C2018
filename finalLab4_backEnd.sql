/* 
NOTAS

- Se asume que el Admin solo realiza ABM de usuarios.
- Se asume que 1 vehiculo = 1 chofer.
- para el color usar enumerados en front end.

*/


drop table if exists tbUsuarios;
drop table if exists tbEmpleados;
drop table if exists tbClientes;
drop table if exists tbViajes;
drop table if exists tbCtasCorrientes;
drop table if exists tbVehiculos;

	
create table tbUsuarios (
	idUsuario          int  unsigned auto_increment primary key,
	nombre    		   varchar(30) null,
	apellido  		   varchar(30) null,
	dni				   varchar(10) null,
	usuario			   varchar(50) not null, -- puede ser texto o email válido
	password		   varchar(20) not null,
	domicilio  		   varchar(50) null,
	tipoUsuario        varchar(2)  not null   -- AD administrador, EN encargado, CL cliente , CH chofer
);

create table tbEmpleados (
	idEmpleado    	   int  unsigned auto_increment primary key,
	idUsuario    	   int	       not null,
	cuil               varchar(12) not null,
	codigoPostal       int (6) 	   not null,
	telefonoFijo	   varchar(20) null,
	telefonoMovil	   varchar(20) null
);

create table tbClientes(
	idCliente 		   int  unsigned auto_increment primary key,
	idUsuario    	   int  	   not null,
	idCtaCorriente     int         null,
	coordenadasDom 	   varchar(80) not null
);

create table tbViajes (
	idViaje        	   int(6) unsigned auto_increment primary key,
	idVehiculo         int  	    not null, 
	idCliente          int          not null,
	domicilioOrig      varchar(50)  not null,
	domicilioDest      varchar(50)  not null,
	coordenadasOrig    varchar(80)  not null,
	coordenadasDest    varchar(80)  not null,
	monto		       varchar(20)  not null,
	fechaViaje         varchar(10)  not null, -- formato  dd/mm/aaaa
	medioPago          varchar(2)   not null  -- EF efectivo  o  CC cuenta corriente 
);


create table tbCtasCorrientes (
	idCtaCorriente     int        unsigned auto_increment primary key,
	idCliente          int         not null,
	saldo		       varchar(20)  not null
);


create table tbVehiculos (
	idVehiculos        int        unsigned auto_increment primary key,
	idEmpleado         int          not null, -- id del chofer
	modelo		       varchar(20)  not null, -- por ej  Renault Sandero 
	anio               varchar(4)   null,
	color              varchar(20)  not null, -- utilizar enumerados en F.E
	dominio            varchar (20) not null, -- chapa patente
	cantPuertas        int(4)       not null,
	utilitario         varchar(2)   not null, -- si/no
	aireAcondicionado  varchar(2)   not null  -- si/no
);

insert into tbUsuarios values(1,"Admin"   ,"Admin"     ,""         , "admin@admin"          ,"1111", ""                              ,"AD");
insert into tbUsuarios values(2,"Jorge"   ,"Fermindez" ,"23456098" , "jfermindez@gmail.com" ,"2222", "Pintos 354, Bernal"            ,"EN");
insert into tbUsuarios values(3,"Hernan"  ,"Rodriguez" ,"30456463" , "hrodriguez@gmail.com" ,"3333", "Sanchez 1290, Quilmes"         ,"CH");
insert into tbUsuarios values(4,"Ezequiel","Alvarez"   ,"31983480" , "ealvarez@gmail.com"   ,"4444", "Payró 289, Longchamps"    	 ,"CH");
insert into tbUsuarios values(5,"Pablo"	  ,"Gomez"     ,"29763356" , "pgomez@gmail.com"     ,"5555", "Asamblea 1344, Burzaco"        ,"CL");
insert into tbUsuarios values(6,"Walter"  ,"Perez"     ,"33250078" , "wperez@gmail.com"     ,"6666", "Ricardo Davel 230, Longchamps" ,"CL");
insert into tbUsuarios values(7,"Javier"  ,"Loria"     ,"32639490" , "jloria@gmail.com"     ,"7777", "Chacabuco 110, Longchamps"     ,"CL");

insert into tbEmpleados values(1,2,"20234560983", 1852,"01142950342","1533664789");
insert into tbEmpleados values(2,3,"20304564633", 1853,"","1545639984");
insert into tbEmpleados values(3,4,"20319834803", 1854,"","1538439211");

insert into tbClientes values(1,5,1,"-34.8255351,-58.40454390000002");
insert into tbClientes values(2,6,2,"-34.8544045,-58.37373769999999");
insert into tbClientes values(3,7,3,"-34.8744992,-58.40693090000002");

insert into tbViajes values (1,1,1,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002,","60,00","27/05/2018","EF");

insert into tbCtasCorrientes values (1,1,"0");
insert into tbCtasCorrientes values (2,2,"0");
insert into tbCtasCorrientes values (3,3,"-150,00");

insert into tbVehiculos values (1,2,"Renault Clio","2014","BL","OLF 948",5,"NO","SI");
insert into tbVehiculos values (2,3,"Renault Kangoo","2016","NE","PAK 455",4,"SI","NO");