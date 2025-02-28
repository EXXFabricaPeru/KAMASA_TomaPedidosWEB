-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2013
-- Description:	Lista de Dimenciones
-- =============================================
CREATE PROCEDURE "EXX_TPED_Dimenciones_Listar"
	
AS
BEGIN
	
	SELECT	"DimCode",
			"DimDesc",
			"DimName"
	FROM ODIM
	ORDER BY "DimCode";
END
