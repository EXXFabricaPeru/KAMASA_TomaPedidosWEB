-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista serie documento
-- =============================================
CREATE PROCEDURE "EXX_TPED_SerieDocumento_Listar" 
(
	IN P_Tipo int,
	IN P_Sucursal int
)
AS
BEGIN
	
	SELECT	"Series", 
			"SeriesName"
	FROM NNM1
	WHERE "ObjectCode" = '17'
	  AND "Locked" = 'N'
	  AND "U_EXX_TPED_APTP" = 'Y'
	  AND "BPLId" = :P_Sucursal
	  AND :P_Tipo = 2

	UNION ALL

	SELECT	"Series", 
			"SeriesName"
	FROM NNM1
	WHERE "ObjectCode" = '23' 
	  AND "U_EXX_TPED_APTP" = 'Y'
	  AND "Locked" = 'N'
	  AND "BPLId" = :P_Sucursal
	  AND :P_Tipo = 1;
END
