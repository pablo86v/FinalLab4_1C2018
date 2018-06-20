
CREATE VIEW viewListaViajes
AS
	select  vi.idViaje,CONCAT(cl.idCliente," - ",us.apellido,",",us.nombre) as cliente, vi.idVehiculo,vi.fechaViaje,vi.monto,vi.estado
	from tbViajes vi inner join tbClientes cl
	on vi.idCliente = cl.idCliente
	inner join tbUsuarios us on cl.idUsuario = us.idUsuario
	order by vi.idViaje desc;

