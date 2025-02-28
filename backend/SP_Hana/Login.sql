ALTER PROCEDURE "EXX_TPED_LOGINTOMAPEDIDO"
(
	IN P_User varchar(15),
	IN P_Pass varchar(150)
)
AS
BEGIN
	
	SELECT	"DocEntry",
			"U_EXX_USER" "Usuario",
			"SlpName" "Nombre",
			COALESCE("U_EXX_VENDEDOR",0) "CodVendedor",
			"U_EXX_PRICELIST" "ListaPrecio",
			"U_EXX_MONEDA" "Moneda",
			COALESCE(T0."U_EXX_SUCURSAL",0) "Sucursal"
	FROM "@EXX_TPED_USERPED" T0
	LEFT JOIN OSLP T1 ON T0."U_EXX_VENDEDOR" = T1."SlpCode"
	WHERE "U_EXX_ACTIVO" = 'Y'
	  AND "U_EXX_USER" = :P_User
	  AND "U_EXX_PASS" = :P_Pass;
	  
END