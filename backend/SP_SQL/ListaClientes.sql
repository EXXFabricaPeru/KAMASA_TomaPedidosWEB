SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista Clientes por Vendedor
-- =============================================
CREATE PROCEDURE [EXX_ClientexVendedor_Listar] -- [EXX_ClientexVendedor_Listar] 'ta',2
	-- Add the parameters for the stored procedure here
	@P_Valor varchar(20),
	@P_Vendedor int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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
	  AND T0."SlpCode" = @P_Vendedor
	  AND (T0."LicTradNum" LIKE '%' + @P_Valor + '%' OR T0."CardName"  LIKE '%' + @P_Valor + '%')
END
GO
