-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista de Provincias
-- =============================================
CREATE PROCEDURE "EXX_TPED_Provincia_Listar"
(
	IN P_CodDepa varchar(5)
)
AS
BEGIN
	
	SELECT "Code", "Name"
	FROM "@EXX_PROVIN"
	WHERE "U_EXX_CODPAI" = 'PE'
	  AND "U_EXX_CODDEP" = :P_CodDepa;
END
