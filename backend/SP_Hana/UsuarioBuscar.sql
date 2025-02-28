CREATE PROCEDURE "EXX_TPED_Usuario_Buscar"
(
	IN P_Codigo varchar(50)
)
AS
BEGIN
	
	SELECT	"Code",
			"U_EXX_USER" "Usuario",
			"SlpName" "Nombre",
			"U_EXX_VENDEDOR" "CodVendedor",
			"U_EXX_PRICELIST" "ListaPrecio",
			"U_EXX_MONEDA" "Moneda",
			"U_EXX_SUCURSAL" "Sucursal"
	FROM "@EXX_TPED_USERPED" T0
	LEFT JOIN OSLP T1 ON T0."U_EXX_VENDEDOR" = T1."SlpCode"
	WHERE "DocEntry" = :P_Codigo;
	  
END