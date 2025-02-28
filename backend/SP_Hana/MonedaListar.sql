-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista moneda
-- =============================================
CREATE PROCEDURE "EXX_TPED_Moneda_Listar"
	
AS
BEGIN
	
	SELECT	"CurrCode" As "Codigo", 
			"CurrCode" ||' - '|| "CurrName" As "Descripcion" 
	FROM OCRN
	WHERE "Locked" = 'N';
END
