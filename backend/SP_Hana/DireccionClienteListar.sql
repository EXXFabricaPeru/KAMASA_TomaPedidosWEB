-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 22/09/2023
-- Description:	Busca Direccion del Cliente
-- =============================================
CREATE PROCEDURE "EXX_TPED_DireccionCliente_Buscar"
(
	IN P_CardCode varchar(12)
)
AS
BEGIN

	SELECT	"Address",
			"Street",
			"ZipCode",
			"County",
			"State",
			"AdresType",
			"LineNum"
	FROM CRD1
	WHERE "CardCode" = :P_CardCode
	ORDER BY "LineNum";
END;
