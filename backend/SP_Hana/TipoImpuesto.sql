-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	lista tipos de impuestos
-- =============================================
CREATE PROCEDURE "EXX_TPED_TipoImpuesto_Listar"

AS
BEGIN
	
	SELECT	"Code",
			"Code" || ' - ' || "Name" AS "Name",
			"Rate"
	FROM "OSTC";
END
