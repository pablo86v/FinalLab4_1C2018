DELIMITER $$

DROP PROCEDURE IF EXISTS restoreDB$$
CREATE PROCEDURE restoreDB()
BEGIN
	drop table if exists tbUsuarios;
	drop table if exists tbEmpleados;
	drop table if exists tbClientes;
	drop table if exists tbViajes;
	drop table if exists tbCtasCorrientes;
	drop table if exists tbVehiculos;

	-- ****************************************** USUARIOS *********************************************************
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
	insert into tbUsuarios values(1,"Admin"   ,"Admin"     ,""         , "admin@admin"          ,"1111", ""                              ,"AD");
	insert into tbUsuarios values(2,"Jorge"   ,"Fermindez" ,"23456098" , "jfermindez@gmail.com" ,"2222", "Pintos 354, Bernal"            ,"EN");
	insert into tbUsuarios values(3,"Hernan"  ,"Rodriguez" ,"30456463" , "hrodriguez@gmail.com" ,"3333", "Sanchez 1290, Quilmes"         ,"CH");
	insert into tbUsuarios values(4,"Ezequiel","Alvarez"   ,"31983480" , "ealvarez@gmail.com"   ,"4444", "Payró 289, Longchamps"    	 ,"CH");
	insert into tbUsuarios values(5,"Antonio" ,"Garzon"    ,"32639476" , "agarzon@gmail.com"     ,"5555", "Pueyrredon 2193, Glew"    	 ,"CH");
	insert into tbUsuarios values(6,"Pedro"   ,"Villa"     ,"26987364" , "pvilla@gmail.com"     ,"5555", "Pueyrredon 2193, Glew"    	 ,"CH");
	insert into tbUsuarios values(7,"Lautaro" ,"Jimenez"   ,"32690253" , "lautijime@gmail.com"     ,"5555", "Pueyrredon 2193, Glew"    	 ,"CH");
	insert into tbUsuarios values(8,"Mariano" ,"Datolo"    ,"22342034" , "mariandato@gmail.com"     ,"5555", "Pueyrredon 2193, Glew"     ,"CH");
	insert into tbUsuarios values(9,"Pablo"	  ,"Gomez"     ,"19647584" , "pgomez@gmail.com"     ,"6666", "Asamblea 1344, Burzaco"         ,"CL");
	insert into tbUsuarios values(10,"Walter"  ,"Perez"     ,"11982032" , "wperez@gmail.com"     ,"7777", "Ricardo Davel 230, Longchamps" ,"CL");
	insert into tbUsuarios values(11,"Javier"  ,"Loria"     ,"32639490" , "jloria@gmail.com"     ,"8888", "Chacabuco 110, Longchamps"     ,"CL");
	insert into tbUsuarios values(12,"Luciano" ,"Calvo"     ,"15675489" , "lucho@gmail.com"     ,"9999", "Chacabuco 110, Longchamps"     ,"CH");
	insert into tbUsuarios values(13,"Ariel"  ,"Sanchez"     ,"32623776" , "jloria@gmail.com"     ,"0010", "Chacabuco 110, Longchamps"     ,"CH");
	
	
	
	-- ****************************************** EMPLEADOS *********************************************************
	create table tbEmpleados (
		idEmpleado    	   int  unsigned auto_increment primary key,
		idUsuario    	   int	       not null,
		cuil               varchar(12) not null,
		telefono    	   varchar(20) null
	);
	insert into tbEmpleados values(1,2,"20234560983","1533664789");
	insert into tbEmpleados values(2,3,"20304564633","1545639984");
	insert into tbEmpleados values(3,4,"20319834803","1538439211");
	insert into tbEmpleados values(4,5,"20326394763","1537679989");
	insert into tbEmpleados values(5,6,"20269873643","1537679989");
	insert into tbEmpleados values(6,7,"20326902533","1537679989");
	insert into tbEmpleados values(7,8,"20223420343","1537679989");
	insert into tbEmpleados values(8,9,"20156754893","1544637822");
	insert into tbEmpleados values(9,10,"20326237763","1537679444");
	
	
	
	-- ****************************************** CLIENTES *********************************************************
	create table tbClientes(
		idCliente 		   int  unsigned auto_increment primary key,
		idUsuario    	   int  	   not null,
		idCtaCorriente     int         null,
		coordenadasDom 	   varchar(80) not null
	);
	insert into tbClientes values(1,5,1,"-34.8255351,-58.40454390000002");
	insert into tbClientes values(2,6,2,"-34.8544045,-58.37373769999999");
	insert into tbClientes values(3,7,3,"-34.8744992,-58.40693090000002");
	
	
	
	-- ****************************************** VIAJES *********************************************************
	create table tbViajes (
		idViaje        	   int(6) unsigned auto_increment primary key,
		idVehiculo         int  	    null, 
		idCliente          int          not null,  -- id de la tabla usuarios
		comodidades        varchar(20)  null ,  -- baul;utilitario;aireAcondicionado
		estado             varchar(15)  not null,  
		domicilioOrig      varchar(50)  not null,
		domicilioDest      varchar(50)  not null,
		coordenadasOrig    varchar(80)  not null,
		coordenadasDest    varchar(80)  not null,
		monto		       varchar(20)  not null,
		fechaViaje         varchar(20)  not null, -- formato  dd/mm/aaaa
		medioPago          varchar(2)   null  -- EF efectivo  o  CC cuenta corriente 
	);

	insert into tbViajes values (1, 1   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (2, 2   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (3, 1   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (4, 2   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (5, 2   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (6, 2   ,7,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"60,00","2018-07-12T10:30","CC");
	insert into tbViajes values (7, 2   ,7,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"60,00","2018-07-12T10:30","CC");
	insert into tbViajes values (8, 2   ,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"60,00","2018-07-12T10:30","CC");
	insert into tbViajes values (9, 2   ,7,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"60,00","2018-07-12T10:30","CC");
	insert into tbViajes values (10,2	,7,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"60,00","2018-07-12T10:30","CC");
	insert into tbViajes values (11,1	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (12,7	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (13,7	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (14,7	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (15,7	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (16,7	,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (17,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (18,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (19,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (20,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (21,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (22,7	,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (23,7   ,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (24,1   ,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (25,1   ,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (26,1   ,9,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (27,1   ,9,"false;true;false" ,"Solicitado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (28,1   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (29,1   ,6,"false;false;false" ,"Realizado" ,"Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","70,00","2018-07-12T10:30","CC");
	insert into tbViajes values (30,1   ,9,"false;false;false" ,"Solicitado","Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","0"    ,"2018-07-12T10:30","EF");
	insert into tbViajes values (31,1   ,6,"false;false;false" ,"Solicitado","Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8735164,-58.39081050000004","-34.8596204,-58.38794330000002","0"    ,"2018-07-12T10:30","CC");
	insert into tbViajes values (32,null,9,"true;true;false"   ,"Solicitado","Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"0"    ,"2018-07-12T10:30","CC");
	insert into tbViajes values (33,null,8,"false;false;false" ,"Solicitado","Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"0"    ,"2018-07-12T10:30","CC");
	insert into tbViajes values (34,null,8,"true;false;true"   ,"Solicitado","Alvear 1775, Longchamps","Av. la Aviacion 749, Longchamps","-34.8807595,-58.39546589999998","-34.881401,-58.38977"          ,"0"    ,"2018-07-12T10:30","EF");
	
	-- ****************************************** CTAS CORRIENTES *****************************************************
	create table tbCtasCorrientes (
		idCtaCorriente     int          unsigned auto_increment primary key,
		idCliente          int          not null,
		saldo		       varchar(20)  not null
	);
	insert into tbCtasCorrientes values (1,1,"0");
	insert into tbCtasCorrientes values (2,2,"0");
	insert into tbCtasCorrientes values (3,3,"-150,00");

	
	
	-- ****************************************** VEHICULOS *********************************************************
	create table tbVehiculos (
		idVehiculo         int          unsigned auto_increment primary key,
		idEmpleado         int          null, -- id del chofer
		modelo		       varchar(20)  not null, -- por ej  Renault Sandero 
		anio               varchar(4)   null,
		color              varchar(20)  not null, -- utilizar enumerados en F.E
		dominio            varchar (20) not null, -- chapa patente
		baul               varchar(10)   not null, -- true/false
		utilitario         varchar(10)   not null, -- true/false
		aireAcondicionado  varchar(10)   not null,  -- true/false
		estado             varchar(20)  not null, -- activo o inactivo 
		foto               varchar(200) null
	);
																				 -- baul   utilitario  aireAcondicionado
	insert into tbVehiculos values (1,2,"Renault Kangoo" ,"2014","Rojo"  ,"OLF948"  ,"true" 	,"true"  	,"true"  ,"Activo" , "");
	insert into tbVehiculos values (2,3,"Renault Kangoo" ,"2016","Negro" ,"PAK455"  ,"true" 	,"true"  	,"false" ,"Activo" , "");
	insert into tbVehiculos values (3,4,"Renault 19"     ,"2012","Blanco","SRU767"  ,"true" 	,"false" 	,"true"  ,"Activo" , "");
	insert into tbVehiculos values (4,5,"Volkswagen Gol" ,"2001","Gris"  ,"TFL098"  ,"true" 	,"false" 	,"false" ,"Activo" , "");
	insert into tbVehiculos values (5,6,"Peugeot Partner","2007","Azul"  ,"TRT434"  ,"false"	,"true"  	,"true"  ,"Activo" , "");
	insert into tbVehiculos values (6,7,"Fiat Cubo"      ,"2008","Blanco","GHU990"  ,"false"	,"true"  	,"false" ,"Activo" , "");
	insert into tbVehiculos values (7,8,"Fiat Palio"     ,"1999","Blanco","FED323"  ,"false"	,"false" 	,"true"  ,"Activo" , "");
	insert into tbVehiculos values (8,9,"Renault 12"     ,"1988","Negro" ,"ARS343"  ,"false"	,"false" 	,"false" ,"Activo" , "");
	
	
END$$

DELIMITER ;