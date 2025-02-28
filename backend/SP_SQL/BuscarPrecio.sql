
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 29/09/2023
-- Description:	Lista de
-- =============================================
CREATE PROCEDURE [EXX_TPED_PrecioArticuloUnd_Buscar] -- [EXX_TPED_PrecioArticuloUnd_Buscar] '20010110409017',2,1,'SOL'
	-- Add the parameters for the stored procedure here
	@P_CodArticulo varchar(15),
	@P_UndMed varchar(15),
	@P_ListaPrec int,
	@P_Moneda varchar(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	
	SELECT "ItemCode", "PriceList", "Currency", "UomEntry", "Price"
	FROM ITM1
	WHERE "Price" > 0
	  AND "ItemCode" = @P_CodArticulo
	  AND "Currency" = @P_Moneda
	  AND "UomEntry" = @P_UndMed
	  AND "PriceList" = @P_ListaPrec

	UNION ALL

	SELECT "ItemCode", "PriceList", "Currency", "UomEntry", "Price"
	FROM ITM9
	WHERE "Price" > 0
	  AND "ItemCode" = @P_CodArticulo
	  AND "Currency" = @P_Moneda
	  AND "UomEntry" = @P_UndMed
	  AND "PriceList" = @P_ListaPrec
	  
END
GO
