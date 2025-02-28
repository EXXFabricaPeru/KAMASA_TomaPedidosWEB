SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista de stock articulos por almacen
-- =============================================
ALTER PROCEDURE [EXX_TPED_StockArticulos_Listar] -- [EXX_TPED_StockArticulos_Listar] 'ARTLOTE'
	-- Add the parameters for the stored procedure here
	@P_CodArticulo varchar(15)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"itm"."ItemName", 
			"stk"."WhsCode", 
			"stk"."OnHand", 
			"stk"."OnHand" - "stk"."IsCommited" + "stk"."OnOrder" AS "Disponible"
	FROM OITM "itm" 
	INNER JOIN "OITW" "stk" ON "itm"."ItemCode" = "stk"."ItemCode"
	WHERE "stk"."OnHand" > 0
	  AND "itm".ItemCode = @P_CodArticulo
END
GO
