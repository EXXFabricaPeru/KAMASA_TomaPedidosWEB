CREATE PROCEDURE "EXX_TPED_ArticuloVenta_Listar"
(
	IN P_Valor varchar(20), 
	IN P_Almacen varchar(20),
	IN P_ListPrice int,
	IN P_Moneda varchar(5)
)
AS
BEGIN
	
	SELECT	"itm"."ItemCode",
			"itm"."ItemName",
			"pre"."Price" AS "PriceUnit",
			"stk"."WhsCode",
			"stk"."OnHand",
			"stk"."OnHand" - "stk"."OnOrder" AS "Disponible",
			"und"."UomEntry",
			"cat"."U_EXK_CENCOSTO"
			--,stk.*
	FROM "OITM" "itm" 
	LEFT  JOIN "@EXK_CATEGORIA" "cat" ON "cat"."Code" = "itm"."U_EXK_CATEGORIA"
	INNER JOIN "OUOM" "und" ON "und"."UomName" = "itm"."SalUnitMsr"
	INNER JOIN "ITM1" "pre" ON "itm"."ItemCode" = "pre"."ItemCode" 
	  	   AND "pre"."PriceList" = :P_ListPrice
	  	   AND "pre"."Currency" = :P_Moneda
	  	   AND "pre"."UomEntry" = "und"."UomEntry"	  	   
	INNER JOIN "OITW" "stk" ON "itm"."ItemCode" = "stk"."ItemCode"
	WHERE "stk"."OnHand" > 0	  
	  AND "itm"."validFor" = 'Y'
	  AND "itm"."frozenFor" = 'N'
	  AND (	UPPER("itm"."ItemCode") LIKE '%' || UPPER(:P_Valor) || '%' OR 
	  		UPPER("itm"."ItemName") LIKE '%' || UPPER(:P_Valor) || '%')
	  AND "stk"."WhsCode" = :P_Almacen;
END
