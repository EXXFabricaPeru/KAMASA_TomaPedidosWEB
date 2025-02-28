-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista de compañias
-- =============================================
CREATE PROCEDURE "EXX_TPED_Companias_Listar"
	-- Add the parameters for the stored procedure here
AS
BEGIN
	
	SELECT	"BPLId",
			"BPLName"
	FROM OBPL
	WHERE "Disabled" <> 'Y';
END
