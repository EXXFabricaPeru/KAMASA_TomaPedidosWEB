-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista Giro Negocio de clientes
-- =============================================
CREATE PROCEDURE "EXX_TPED_GriroNegocio_Listar"
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	
	SELECT	"IndCode",
			"IndName"
	FROM OOND;
END
