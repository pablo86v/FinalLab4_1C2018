
DELIMITER $$

DROP VIEW IF EXISTS spGetVehiculosConComodidades$$
CREATE PROCEDURE spGetVehiculosConComodidades(IN cantPuertas varchar(2), IN utilitario varchar(2),IN aireAcondicionado varchar(2))
BEGIN
   select *
   from tbVehiculos ve
   where ve.cantPuertas = cantPuertas and ve.utilitario = utilitario and ve.aireAcondicionado = aireAcondicionado;

END$$

DELIMITER ;