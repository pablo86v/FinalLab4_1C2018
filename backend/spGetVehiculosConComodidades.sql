
DELIMITER $$
DROP PROCEDURE IF EXISTS spGetVehiculosConComodidades$$
CREATE PROCEDURE spGetVehiculosConComodidades(IN baul varchar(20), IN utilitario varchar(20),IN aireAcondicionado varchar(20))
BEGIN
   select *
   from tbVehiculos ve
   where ve.baul = baul and ve.utilitario = utilitario and ve.aireAcondicionado = aireAcondicionado;

END$$
DELIMITER ;