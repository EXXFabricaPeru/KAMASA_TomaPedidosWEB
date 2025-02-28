-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista Tipo Operación
-- =============================================
CREATE PROCEDURE "EXX_TPED_TipoOperacion_listar"

AS
BEGIN

	SELECT	"Code",
			"Code" || ' - ' || "Name" AS "Name"
	FROM "@EXX_TIPOOPER";
END
