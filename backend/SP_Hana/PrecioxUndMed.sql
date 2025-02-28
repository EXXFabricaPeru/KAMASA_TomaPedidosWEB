CREATE PROCEDURE "EXX_TPED_PrecioArticuloUnd_Buscar"
(
	IN P_CodArticulo varchar(15),
	IN P_UndMed varchar(15),
	IN P_ListaPrec int,
	IN P_Moneda varchar(3)
)
AS
-- =================================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description: Busca el precio por unidad de medida
-- =================================================
BEGIN
	
	SELECT "ItemCode", "PriceList", "Currency", "UomEntry", "Price"
	FROM ITM1
	WHERE "Price" > 0
	  AND "ItemCode" = :P_CodArticulo
	  AND "Currency" = :P_Moneda
	  AND "UomEntry" = :P_UndMed
	  AND "PriceList" = :P_ListaPrec

	UNION ALL

	SELECT "ItemCode", "PriceList", "Currency", "UomEntry", "Price"
	FROM ITM9
	WHERE "Price" > 0
	  AND "ItemCode" = :P_CodArticulo
	  AND "Currency" = :P_Moneda
	  AND "UomEntry" = :P_UndMed
	  AND "PriceList" = :P_ListaPrec;
	  
END
