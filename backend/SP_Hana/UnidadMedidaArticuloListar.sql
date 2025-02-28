ALTER PROCEDURE "EXX_TPED_UnidadMedidaArticulo_Listar"
(
	IN P_CODART varchar(60)
)
AS
BEGIN
	SELECT	
			T3."UomEntry",
			T4."UomCode",
			T4."UomName"
	FROM "OITM" T1 
	INNER JOIN "OUGP" T2 ON T2."UgpEntry" = T1."UgpEntry" 
	INNER JOIN "UGP1" T3 ON T3."UgpEntry" = T2."UgpEntry"
	INNER JOIN "OUOM" T4 ON T4."UomEntry" = T3."UomEntry"
	WHERE T1."ItemCode" = :P_CODART
	;
END;
