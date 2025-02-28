CREATE PROCEDURE "EXX_TPED_StockArticulos_Listar"
(
	IN P_CodArticulo varchar(15)
)
AS
-- =================================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista de stock articulos por almacen
-- =================================================
BEGIN
	
	SELECT	"itm"."ItemName", 
			"stk"."WhsCode" || ' - ' || "alm"."WhsName" "WhsCode", 
			"stk"."OnHand", 
			"stk"."OnHand" - "stk"."IsCommited" + "stk"."OnOrder" AS "Disponible"
	FROM OITM "itm" 
	INNER JOIN "OITW" "stk" ON "itm"."ItemCode" = "stk"."ItemCode"
	INNER JOIN "OWHS" "alm" ON "alm"."WhsCode" = "stk"."WhsCode"
	WHERE "stk"."OnHand" > 0
	  AND "itm"."ItemCode" = :P_CodArticulo;
END
