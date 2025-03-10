-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista Usuarios
-- =============================================
CREATE PROCEDURE "EXX_TPED_Usuario_Listar"
(
	IN P_Valor varchar(50)
)
AS
BEGIN
	
	SELECT	"DocEntry",
			"U_EXX_USER" "Usuario",
			"SlpName" "Nombre",
			"U_EXX_VENDEDOR" "CodVendedor",
			"U_EXX_PRICELIST" "ListaPrecio",
			"U_EXX_MONEDA" "Moneda",
			CASE WHEN "U_EXX_ACTIVO" = 'Y' THEN 'ACTIVO' ELSE 'INACTIVO' END "Estado"
	FROM "@EXX_TPED_USERPED" T0
	LEFT JOIN OSLP T1 ON T0."U_EXX_VENDEDOR" = T1."SlpCode"
	WHERE "Code" <> '0'
	  AND ("U_EXX_USER" = :P_Valor OR UPPER("SlpName") LIKE '%' || :P_Valor || '%');
	  
END
