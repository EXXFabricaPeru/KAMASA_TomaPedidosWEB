-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista grupo de clientes
-- =============================================
CREATE PROCEDURE "EXX_TPED_GrupoClientes_Listar"
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	
	SELECT	"GroupCode", 
			"GroupName"
	FROM OCRG
	WHERE "GroupType" = 'C';
END
