-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista los proyectos
-- =============================================
CREATE PROCEDURE "EXX_TPED_Proyectos_Listar"
	
AS
BEGIN
	
	SELECT  "PrjCode",
			"PrjCode" || ' - ' || "PrjName" AS "PrjName"
	FROM OPRJ
	WHERE "Active" = 'Y';

END
