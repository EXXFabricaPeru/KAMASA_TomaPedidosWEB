-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista los almacenes 
-- =============================================
CREATE PROCEDURE "EXX_TPED_Almacen_Listar"
(
	IN P_Sucursal int
)
AS
BEGIN
	
	SELECT	"WhsCode", 
			"WhsCode" || '-'|| "WhsName" AS "WhsName"
	FROM "OWHS"
	WHERE "U_EXX_TPED_APTP" ='Y'
	  AND "BPLid" = :P_Sucursal;
END
