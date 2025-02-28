-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Lista departamento
-- =============================================
CREATE PROCEDURE "EXX_TPED_Departamento_Listar"
	
AS
BEGIN
	
	SELECT "Code", "Name"
	FROM OCST
	WHERE "Country" = 'PE';
	
END
