-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 13/09/2023
-- Description:	Lista Condiciones de PAgo
-- =============================================
CREATE PROCEDURE "EXX_TPED_CondicionPago_Listar"
	
AS
BEGIN

	SELECT "GroupNum" "Codigo", "PymntGroup" "Descripcion"
	FROM OCTG;
END
