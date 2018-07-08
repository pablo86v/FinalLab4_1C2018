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
