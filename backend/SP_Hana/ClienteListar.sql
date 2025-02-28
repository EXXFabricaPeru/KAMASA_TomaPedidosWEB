ALTER PROCEDURE "EXX_TPED_ClientexVendedor_Listar"
(
	IN P_Valor varchar(20),
	IN P_Vendedor int
)
AS
BEGIN
	DECLARE xGrupoCliente varchar(25);
	DECLARE xDepartamento varchar(25);
	DECLARE xZona varchar(25);

	--SELECT "U_EXK_TPOCLIE", "U_EXK_CODDPTO", "U_EXK_ZONA" INTO xGrupoCliente, xDepartamento, xZona FROM "@EXK_TSCZ" WHERE "U_EXK_SLPCODE" = :P_Vendedor;
	
	SELECT	"CardCode",
			"CardName",
			"LicTradNum",
			"ListNum", --ListaPrecio
			"SlpCode",
			"GroupNum", --Condicion de pago
			"CreditLine",
			CASE WHEN "CreditLine" > 0 THEN "CreditLine" + "Balance" ELSE 0 END AS "Saldo"
	FROM "OCRD" T0
	WHERE T0."validFor" = 'Y'
	  AND T0."SlpCode" = :P_Vendedor
	  --AND T0."U_EXK_ZONA" = :xZona
	  --AND T0."GroupNum" = :xGrupoCliente
	  --AND T0."U_EXK_CODDPTO" = xDepartamento
	  AND (T0."LicTradNum" LIKE '%' || :P_Valor || '%' OR UPPER(T0."CardName")  LIKE '%' || UPPER(:P_Valor) || '%');
END