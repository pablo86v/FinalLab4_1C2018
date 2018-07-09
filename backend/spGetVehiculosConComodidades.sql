
DELIMITER $$
DROP PROCEDURE IF EXISTS spGetVehiculosConComodidades$$
CREATE PROCEDURE spGetVehiculosConComodidades(IN cantPuertas varchar(20), IN utilitario varchar(20),IN aireAcondicionado varchar(20))
BEGIN
   select *
   from tbVehiculos ve
   where ve.cantPuertas = cantPuertas and ve.utilitario = utilitario and ve.aireAcondicionado = aireAcondicionado;

END$$
DELIMITER ;