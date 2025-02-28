-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista SubDimenciones
-- =============================================
CREATE PROCEDURE "EXX_TPED_SubDimenciones_Listar"
(
	IN P_Dimencion int
)
AS
BEGIN
	
	SELECT	"PrcCode",
			"PrcName"
	FROM OPRC
	WHERE "Locked" = 'N'
	  AND "DimCode" = :P_Dimencion
	ORDER BY "PrcName";
END
