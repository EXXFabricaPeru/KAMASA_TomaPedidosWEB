SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista ariculos por almacén
-- =============================================
CREATE PROCEDURE [EXX_ArticuloVenta_Listar] -- [EXX_ArticuloVenta_Listar] 'bandeja', 'alm carr'
	-- Add the parameters for the stored procedure here
	@P_Valor varchar(20) = 0, 
	@P_Almacen varchar(20) = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"itm"."ItemCode",
			"itm"."ItemName",
			"pre"."Price" AS "PriceUnit",
			"stk"."WhsCode",
			"stk"."OnHand",
			"stk"."OnHand" - "stk"."OnOrder" AS "Disponible"
			--,stk.*
	FROM "OITM" "itm" 
	INNER JOIN "ITM1" "pre" ON "itm"."ItemCode" = "pre"."ItemCode" AND "pre"."PriceList" = 1
	INNER JOIN "OITW" "stk" ON "itm"."ItemCode" = "stk"."ItemCode"
	WHERE stk.OnHand > 0	  
	  AND validFor = 'Y'
	  AND frozenFor = 'N'
	  AND (itm.ItemCode LIKE '%' + @P_Valor + '%' OR itm.ItemName LIKE '%' + @P_Valor + '%')
	  AND stk.WhsCode = @P_Almacen
END
GO
-- SELECT * FROM "ITM1"