
-- ********************************************************************
DELIMITER $$
DROP VIEW IF EXISTS viewListaVehiculos$$
CREATE VIEW viewListaVehiculos
AS
	select  ve.idVehiculo,CONCAT(ve.IdEmpleado," - ",us.apellido,",",us.nombre) as chofer, ve.modelo,ve.anio,ve.color,ve.estado, ve.dominio
	from tbVehiculos ve inner join tbEmpleados em
	on ve.IdEmpleado = em.IdEmpleado
	inner join tbUsuarios us on em.idUsuario = us.idUsuario
	order by ve.idVehiculo asc;
$$
DELIMITER ;


-- ********************************************************************
DELIMITER $$
DROP VIEW IF EXISTS viewListaViajes$$
CREATE VIEW viewListaViajes
AS
	-- select  vi.idViaje,CONCAT(cl.idCliente," - ",us.apellido,",",us.nombre) as cliente, vi.idVehiculo,vi.fechaViaje,vi.domicilioDest,vi.estado,vi.monto,vi.medioPago
	-- from tbViajes vi inner join tbClientes cl
	-- on vi.idCliente = cl.idCliente
	-- inner join tbUsuarios us on cl.idUsuario = us.idUsuario
	-- order by vi.idViaje desc;
	
	select  vi.idViaje,CONCAT(vi.idCliente," - ",us.apellido,",",us.nombre) as cliente, vi.idVehiculo,vi.fechaViaje,vi.domicilioDest,vi.estado,vi.monto,vi.medioPago
	from tbViajes vi inner join tbUsuarios us
	on vi.idCliente = us.idUsuario
	order by vi.idViaje desc;
	
$$
DELIMITER ;


-- ********************************************************************
DELIMITER $$
DROP VIEW IF EXISTS viewListaChoferes$$
CREATE VIEW viewListaChoferes
AS

	select em.idEmpleado , CONCAT(us.apellido,",",us.nombre) as empleado , us.usuario, em.cuil, em.telefono
	from tbEmpleados em inner  join tbUsuarios us
	on em.idUsuario = us.idUsuario
	order by em.idEmpleado asc;
	
$$
DELIMITER ;


